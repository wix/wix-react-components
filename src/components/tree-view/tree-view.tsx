import * as React from 'react';

import {autorun, observable} from 'mobx';
import {observer} from 'mobx-react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import style from './tree-view.st.css';

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeEntity {
    itemRenderer: React.ComponentType<TreeItemProps>;
    onItemClick?: React.EventHandler<any>;
    stateMap: StateMap;
}

export interface TreeItemProps extends TreeEntity {
    item: TreeItemData;
    state: TreeItemState;
}

export interface TreeNodesProps extends TreeEntity {
    show: boolean;
    nodes?: TreeItemData[];
}

export interface TreeViewProps {
    dataSource: TreeItemData[];
    itemRenderer?: React.ComponentType<TreeItemProps>;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> =
    SBStateless(({ item, itemRenderer, onItemClick, stateMap, state }) => {
    const itemLabel = item.label.replace(' ', '_');
    const TreeNode = itemRenderer;
    const onClick = () => onItemClick!(item);
    return (
        <div>
            <div
                data-automation-id={`${itemIdPrefix}_${itemLabel}`}
                className="tree-node"
                cssStates={{selected: state!.isSelected}}
                onClick={onClick}
                data-selected={state!.isSelected}
            >
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}>{item.label}</span>
            </div>
            <div className="nested-tree">
                <TreeNodes
                    show={state!.isExpanded}
                    nodes={item.children}
                    onItemClick={onItemClick}
                    itemRenderer={itemRenderer}
                    stateMap={stateMap}
                />
            </div>
        </div>
    );
}, style);

const TreeItemWrapper = observer(TreeItem);

@SBComponent(style) @observer
export class TreeView extends React.Component<TreeViewProps, {}> {
    public static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    private stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initStateMap(props.dataSource);
    }

    public componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = true;
            }
        });
    }

    public render() {
        const TreeNode = this.props.itemRenderer!;
        return (
            <div data-automation-id="TREE_VIEW" className="tree-view">
                <TreeNodes
                    show={true}
                    nodes={this.props.dataSource}
                    onItemClick={this.onSelectItem}
                    itemRenderer={this.props.itemRenderer!}
                    stateMap={this.stateMap}
                />
            </div>
        );
    }

    private initStateMap(data: object[] = []) {
        data.forEach((item: TreeItemData) => {
            this.stateMap.set(item, observable({ isSelected: false, isExpanded: false }));
            this.initStateMap(item.children || []);
        });
    }

    private toggleItem(item: TreeItemData) {
        if (!this.stateMap.get(item)!.isExpanded || this.props.selectedItem === item) {
            this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
        }
    }

    private onSelectItem = (item: TreeItemData) => {
        if (this.props.selectedItem) {
            this.stateMap.get(this.props.selectedItem)!.isSelected = false;
            this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
        } else {
            this.props.onSelectItem!(item);
        }
        this.toggleItem(item);
    }
}

export const TreeNodes: React.SFC<TreeNodesProps> =
    (props: TreeNodesProps): React.ReactElement<TreeNodesProps> | null => {
    const {show, nodes, itemRenderer, onItemClick, stateMap} = props;

    if (!show || !nodes || !nodes.length) {
        return null;
    }

    const TreeNode = itemRenderer;
    return (
        <div>
            {nodes.map((node: TreeItemData, index: number) => {
                return (
                    <TreeNode
                        item={node}
                        itemRenderer={itemRenderer}
                        onItemClick={onItemClick}
                        stateMap={stateMap}
                        state={stateMap.get(node)!}
                        key={index}
                    />
                );
            })}
        </div>
    );
};
