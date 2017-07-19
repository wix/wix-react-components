import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';
import { KeyCodes } from '../../common/key-codes';

const style = require('./tree-view.css');

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: React.ComponentClass<TreeItemProps> | React.StatelessComponent<TreeItemProps>;
    onItemClick?: React.EventHandler<any>;
    stateMap: StateMap;
    state: TreeItemState;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: React.ComponentClass<TreeItemProps> | React.StatelessComponent<TreeItemProps>;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
    onFocusItem?: React.EventHandler<any>;
    focusedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
    isFocused: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;
export type ParentsMap = Map<TreeItemData, TreeItemData | undefined>;

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> = ({ item, itemRenderer, onItemClick, stateMap, state }) => {
    const itemLabel = item.label.replace(' ', '_');
    return (
        <div>
            <div data-automation-id={`${itemIdPrefix}_${itemLabel}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)}
                 data-selected={ state!.isSelected }
                 data-focused={ state!.isFocused }>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {state!.isExpanded && (item.children || []).map((child: TreeItemData, index: number) =>
                    React.createElement(itemRenderer as React.ComponentClass<TreeItemProps>,
                        {item: child, onItemClick, itemRenderer, stateMap, state: stateMap.get(child)!, key: `${index}`}))}
            </div>
        </div>
    )
};

const TreeItemWrapper = observer(TreeItem);

@observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps: Partial<TreeViewProps> = { itemRenderer: TreeItemWrapper, onSelectItem: () => {}, onFocusItem: () => {} };

    stateMap: StateMap = new Map<TreeItemData, TreeItemState>();
    parentsMap: ParentsMap = new Map<TreeItemData, TreeItemData | undefined>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initState(props.dataSource as TreeItemData[], undefined);
    }

    initState(data: TreeItemData[] = [], parent: TreeItemData | undefined) {
        data.forEach((item: TreeItemData) => {
            this.stateMap.set(item, observable({ isSelected: false, isExpanded: false, isFocused: false }));
            this.parentsMap.set(item, parent);
            this.initState(item.children || [], item);
        });
    }

    componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = true;
            }
            if (this.props.focusedItem) {
                this.stateMap.get(this.props.focusedItem)!.isFocused = true;
            }
        });
    }

    toggleItem(item: TreeItemData) {
        if (this.stateMap.get(item)!.isExpanded && this.props.selectedItem !== item) return;
        this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
    }

    onSelectItem = (item: TreeItemData) => {
        if (this.props.selectedItem) {
            this.stateMap.get(this.props.selectedItem)!.isSelected = false;
            this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
        } else {
            this.props.onSelectItem!(item);
        }
        this.toggleItem(item);
    };

    getPreviousItem(item: TreeItemData) {
        const parent = this.parentsMap.get(item);

        const siblings = parent ? parent.children! : this.props.dataSource;

        const itemIdx = siblings.indexOf(item);
        if (itemIdx === 0) return item;

        const prevSibling = siblings[itemIdx - 1] as TreeItemData;
        const prevSiblingState = this.stateMap.get(prevSibling)!;

        if (prevSiblingState.isExpanded && prevSibling.children!.length ) {
            return prevSibling.children![prevSibling.children!.length - 1];
        } else {
            return prevSibling;
        }
    }

    getNextItem(item: TreeItemData) {
        const itemState = this.stateMap.get(item)!;

        if (itemState.isExpanded && item.children) {
            return item.children![0];
        } else {
            const parent = this.parentsMap.get(item);
            const siblings = parent ? parent.children! : this.props.dataSource;
            const itemIdx = siblings.indexOf(item);
            return itemIdx !== siblings.length ? siblings[itemIdx + 1] : item;
        }
    }

    expandItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = true;
    collapseItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = false;
    focusPrev = (item: TreeItemData) => this.props.onFocusItem!(this.getPreviousItem(item) as TreeItemData);
    focusNext = (item: TreeItemData) => this.props.onFocusItem!(this.getNextItem(item) as TreeItemData);

    onKeyDown = (e: any) => {
        if (!this.props.focusedItem) return;

        this.stateMap.get(this.props.focusedItem)!.isFocused = false;

        switch(e.keyCode) {
            case KeyCodes.RIGHT:
                this.expandItem(this.props.focusedItem); return;
            case KeyCodes.LEFT:
                this.collapseItem(this.props.focusedItem); return;
            case KeyCodes.UP:
                this.focusPrev(this.props.focusedItem); return;
            case KeyCodes.DOWN:
                this.focusNext(this.props.focusedItem); return;
            default:
                return;
        }
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW' className={style['tree-view']} tabIndex={0} onKeyDown={this.onKeyDown}>
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    React.createElement(
                        this.props.itemRenderer as React.ComponentClass<TreeItemProps>,
                        {item, onItemClick: this.onSelectItem, itemRenderer: this.props.itemRenderer!,
                            stateMap: this.stateMap, state: this.stateMap.get(item)!, key: `${index}` }))}
            </div>
        )
    }
}
