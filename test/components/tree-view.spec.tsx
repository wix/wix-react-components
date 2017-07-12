import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { TreeView, TreeItem } from '../../src';
import { TreeViewDemo, treeData } from '../../demo/tree-view-demo';
import { TreeItemData } from '../../src/components/tree-view/tree-view';

const treeView = 'TREE_VIEW';
const treeItem = 'TREE_ITEM';

const noop = (item: Object) => false;

function getLabelsList(data: {label: string, children?: Object[]}): string[] {
    return [data.label].concat(...(data.children || []).map(getLabelsList));
}

describe('<TreeView />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    function getTreeItem(id: string) {
        return `${treeItem}_${id}`;
    }

    it('renders a tree view with a few children, clicks ones of then', async () => {
        const { select, waitForDom } = clientRenderer.render(<TreeViewDemo />);

        await waitForDom(() => expect(select(treeView + '_DEMO')).to.be.present());

        simulate.click(select(getTreeItem(treeData[0].label)));

        const allNodesLabels = treeData.map(getLabelsList).reduce((prev, next) => [...prev, ...next]);
        await waitForDom(() => allNodesLabels.forEach(item =>
            expect(select(treeView + '_DEMO', getTreeItem(item))).to.be.present()));

        const elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));

        simulate.click(elementToSelect);

        return waitForDom(() => expect(elementToSelect).to.have.attr('data-selected', 'true'));

    });

    describe('Using default renderer', () => {

        it('renders to the screen', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() => expect(select(treeView)).to.be.present());
        });

        it('renders correct children', () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            return waitForDom(() =>
                treeData.forEach((item: TreeItemData) =>
                    expect(select(treeView, getTreeItem(item.label))).to.be.present()));
        });

        it('invokes the onSelectItem callback when an item is clicked', () => {
            const onSelectItem = sinon.spy();
            const { select } = clientRenderer.render(<TreeView dataSource={treeData} onSelectItem={onSelectItem}/>);

            simulate.click(select(getTreeItem(treeData[0].label)));

            const firstNodeChildren = treeData[0].children;

            const nodeLabelToClick = getTreeItem(firstNodeChildren![1].label);

            simulate.click(select(nodeLabelToClick));

            return waitFor(() => {
                expect(onSelectItem).to.have.been.calledOnce;
                expect(onSelectItem).to.have.been.calledWithMatch(firstNodeChildren![1]);
            });
        });

        it('expands and collapses an item with children when clicked', async () => {
            const { select, waitForDom } = clientRenderer.render(<TreeView dataSource={treeData} />);

            debugger;

            const nodeChildren = treeData[0].children;
            await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());

            debugger;

            simulate.click(select(getTreeItem(treeData[0].label)));
            await waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.present());

            debugger;
            simulate.click(select(getTreeItem(treeData[0].label)));
            return waitForDom(() => expect(select(getTreeItem(nodeChildren![1].label))).to.be.absent());
        });

        describe('<TreeItem />', () => {

            const item = { label: 'label' };

            it('renders an item', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label))).to.be.present());
            });

            it('renders with provided label', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_LABEL')).to.have.text(item.label));
            });

            it('renders with an icon', () => {
                const { select, waitForDom } =
                    clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem} isSelected={noop}/>);

                return waitForDom(() => expect(select(getTreeItem(item.label) + '_ICON')).to.be.present());
            });

            it('invokes onClick when clicked', () => {
                const onClick = sinon.spy();
                const { select } = clientRenderer.render(<TreeItem item={item} itemRenderer={TreeItem}
                                                                   onItemClick={onClick} isSelected={noop}/>);

                simulate.click(select(getTreeItem(item.label)));

                return waitFor(() => expect(onClick).to.have.been.calledOnce);
            });
        });
    });
});
