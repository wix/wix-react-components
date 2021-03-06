import {action, observable} from 'mobx';
import React = require('react');
import {SelectionListDivider, SelectionListDividerSymbol} from './divider';
import {SelectionListOption} from './option';
import {TypeAhead} from './type-ahead';

export type SelectionListItemValue = any;

export interface SelectionListItem {
    disabled: boolean;
    focused: boolean;
    isOption: boolean;
    item: DataSourceItem | React.ReactChild;
    label: string;
    render: (id: string) => JSX.Element | null;
    selectable: boolean;
    selected: boolean;
    value: SelectionListItemValue;
}

export type DataSourceItem = number | string | symbol | object;

export interface DataSourceItemResolved {
    value?: SelectionListItemValue;
    label?: string;
    disabled?: boolean;
}

export interface OptionList {
    dataSource?: DataSourceItem[];
    dataMapper?: (item: DataSourceItem) => DataSourceItemResolved;
    renderItem?: (
        item: DataSourceItem,
        itemResolved: DataSourceItemResolved,
        props: {id: string; selected: boolean; focused: boolean}
    ) => JSX.Element | null;
}

export type DataSourceItemDefaultFormat = string | symbol | DataSourceItemResolved;

function defaultResolveItem(item: DataSourceItem): DataSourceItemResolved {
    if (typeof item === 'number') {
        return {value: item, label: item.toString()};
    }

    if (typeof item === 'string') {
        return {value: item, label: item};
    }

    if (typeof item === 'object') {
        return item;
    }

    return {};
}

function defaultRenderItem(
    item: DataSourceItemDefaultFormat,
    itemResolved: DataSourceItemResolved,
    {id, selected, focused}: {id: string, selected: boolean, focused: boolean}
): JSX.Element | null {
    if (item === SelectionListDividerSymbol) {
        return <SelectionListDivider />;
    }

    if (itemResolved.value !== undefined) {
        return (
            <SelectionListOption
                id={id}
                value={itemResolved.value}
                disabled={itemResolved.disabled}
                selected={selected}
                focused={focused}
            >
                {itemResolved.label}
            </SelectionListOption>
        );
    }

    return null;
}

class SelectionListItemBasedOnDataSource implements SelectionListItem {
    @observable public selected: boolean = false;
    @observable public focused: boolean = false;

    private itemResolved: DataSourceItemResolved;

    constructor(
        public item: DataSourceItem,
        public resolveItem: OptionList['dataMapper'] = defaultResolveItem,
        public renderItem: OptionList['renderItem'] = defaultRenderItem
    ) {
        this.itemResolved = resolveItem(item);
    }

    public get isOption(): boolean {
        return this.itemResolved.value !== undefined;
    }

    public get selectable(): boolean {
        return this.isOption && !this.disabled;
    }

    public get value(): SelectionListItemValue {
        return this.itemResolved.value;
    }

    public get label(): string {
        return this.itemResolved.label || '';
    }

    public get disabled(): boolean {
        return Boolean(this.itemResolved.disabled);
    }

    public render(id: string): JSX.Element | null {
        return this.renderItem!(this.item, this.itemResolved, {id, selected: this.selected, focused: this.focused});
    }
}

class SelectionListItemBasedOnChild implements SelectionListItem {
    @observable public selected: boolean = false;
    @observable public focused: boolean = false;

    constructor(public item: React.ReactChild) {}

    public get isOption(): boolean {
        return typeof this.item === 'object' && this.item.props.value !== undefined;
    }

    public get selectable(): boolean {
        return  this.isOption && !this.disabled;
    }

    public get value(): SelectionListItemValue {
        return typeof this.item === 'object' ? this.item.props.value : undefined;
    }

    public get label(): string {
        if (typeof this.item === 'object') {
            if (this.item.props.label !== undefined) {
                return this.item.props.label;
            }
            if (typeof this.item.props.children === 'string') {
                return this.item.props.children;
            }
        }
        return '';
    }

    public get disabled(): boolean {
        return Boolean(typeof this.item === 'object' && this.item.props.disabled);
    }

    public render(id: string): JSX.Element | null {
        if (typeof this.item !== 'object') {
            return null;
        }

        return this.isOption ?
            React.cloneElement(this.item, {id, selected: this.selected, focused: this.focused}) : this.item;
    }
}

export function selectionListItemsFromDataSource(
    dataSource: OptionList['dataSource'] = [],
    resolveItem: OptionList['dataMapper'] = defaultResolveItem,
    renderItem: OptionList['renderItem'] = defaultRenderItem
): SelectionListItem[] {
    return dataSource.map(item => new SelectionListItemBasedOnDataSource(item, resolveItem, renderItem));
}

export function selectionListItemsFromChildren(children: React.ReactNode): SelectionListItem[] {
    return React.Children.map(children, item => new SelectionListItemBasedOnChild(item));
}

export function selectionListItemsFromProps(props: OptionList & {children?: React.ReactNode}): SelectionListItem[] {
    return selectionListItemsFromChildren(props.children || []).concat(
        selectionListItemsFromDataSource(props.dataSource, props.dataMapper, props.renderItem)
    );
}

export class SelectionListModel {
    @observable public items: SelectionListItem[] = [];
    @observable public focusedIndex: number = -1;
    @observable public selectedIndex: number = -1;

    private typeAhead = new TypeAhead(
        () => this.items.length,
        () => this.focusedIndex,
        i => this.items[i].selectable ? this.items[i].label : ''
    );

    constructor(items: SelectionListItem[]) {
        this.items = items;
    }

    @action public selectValue(value: SelectionListItemValue): void {
        this.selectIndex((value === undefined) ? -1 : this.items.findIndex(item => item.value === value));
    }

    public hasSelection(): boolean {
        return this.selectedIndex > -1;
    }

    @action public focusSelected(): void {
        if (this.selectedIndex > -1 && this.items[this.selectedIndex].selectable) {
            this.focusIndex(this.selectedIndex);
        }
    }

    @action public focusUsingTypeAhead(event: React.KeyboardEvent<Element>): boolean {
        const index = this.typeAhead.handleEvent(event);
        return index > -1 && this.focusIndex(index);
    }

    public focusFirst(): boolean {
        return this.focusIndex(this.findSelectable(0, 1));
    }

    public focusLast(): boolean {
        return this.focusIndex(this.findSelectable(this.items.length - 1, -1));
    }

    public focusPrevious(): boolean {
        if (this.focusedIndex === -1) {
            return this.focusLast();
        } else {
            const index = this.findSelectable(this.focusedIndex - 1, -1);
            if (index !== -1) {
                return this.focusIndex(index);
            }
        }
        return false;
    }

    public focusNext(): boolean {
        if (this.focusedIndex === -1) {
            return this.focusFirst();
        } else {
            const index = this.findSelectable(this.focusedIndex + 1, 1);
            if (index !== -1) {
                return this.focusIndex(index);
            }
        }
        return false;
    }

    @action public focusIndex(newIndex: number): boolean {
        const oldIndex = this.focusedIndex;
        if (oldIndex !== newIndex) {
            (oldIndex > -1) && (this.items[oldIndex].focused = false);
            (newIndex > -1) && (this.items[newIndex].focused = true);
            this.focusedIndex = newIndex;
            return true;
        }
        return false;
    }

    @action public selectIndex(newIndex: number): void {
        const oldIndex = this.selectedIndex;
        if (oldIndex !== newIndex) {
            (oldIndex > -1) && (this.items[oldIndex].selected = false);
            (newIndex > -1) && (this.items[newIndex].selected = true);
            this.selectedIndex = newIndex;
        }
    }

    private findSelectable(startIndex: number, step: number): number {
        for (let i = startIndex; 0 <= i && i < this.items.length; i += step) {
            if (this.items[i].selectable) {
                return i;
            }
        }
        return -1;
    }
}
