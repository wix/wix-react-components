import * as React from 'react';
import {Stylesheet} from 'stylable';
import {DriverBase, simulate} from 'test-drive-react';
import {TreeItem, TreeItemProps, TreeKeyCodes, TreeView} from '../../src';
import treeItemStyle from '../../src/components/tree-view/tree-item.st.css';
import {elementHasStylableState} from '../../test-kit/utils';

const treeItem = 'TREE_ITEM';
export type ValidKeyCodes = 'ENTER' | 'HOME' | 'END' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const getTreeItem = (id: string) => `${treeItem}_${id.replace(' ', '_')}`;

export class TreeViewDriver extends DriverBase {
    public static ComponentClass = TreeView;

    public getItem(id: string): TreeItemDriver {
        return new TreeItemDriver(() => this.select(getTreeItem(id)));
    }

    public pressKey(keyCode: ValidKeyCodes): void {
        simulate.keyDown(this.root, {keyCode: TreeKeyCodes[keyCode]});
    }
}

export class TreeItemDriver extends DriverBase {
    public static ComponentClass: React.SFC<TreeItemProps> = TreeItem;

    private get id(): string {
        return this.root.getAttribute('data-automation-id')!;
    }

    public get label(): HTMLSpanElement {
        return this.select(`${this.id}_LABEL`);
    }

    public get icon(): SVGElement {
        return this.select(`${this.id}_ICON`);
    }

    public clickIcon(): void {
        simulate.click(this.icon);
    }

    public clickLabel(): void {
        simulate.click(this.label);
    }

    public isSelected(style: {$stylesheet: Stylesheet} = treeItemStyle): boolean {
        return elementHasStylableState(this.root, style, 'selected');
    }

    public isFocused(style: {$stylesheet: Stylesheet} = treeItemStyle): boolean {
        return elementHasStylableState(this.root, style, 'focused');
    }

    public getNestedItem(id: string): TreeItemDriver {
        return new TreeItemDriver(() => this.select(getTreeItem(id)));
    }
}
