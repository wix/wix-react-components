import * as React from 'react';
import { AutoComplete } from '../../src';
import { SelectionItem } from '../../src/components/selection-list/selection-list';
//
export interface AutoCompleteDemoState {
    selectedItem: SelectionItem | undefined;
    open: boolean;
    inputText: string;
}
//
// const items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles',
//                'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];
//
export class AutoCompleteDemo extends React.Component<{}, AutoCompleteDemoState> {
    render() {
        return null
    }
//
//     public state = { selectedItem: undefined, open: true, inputText: '' };
//
//     public onChange = (value: string) => {
//         this.setState({
//             inputText: value
//         });
//     }
//
//     public onItemClick = (item: string) => {
//         this.setState({
//             selectedItem: item
//         });
//     }
//     // onItemClick={this.onItemClick}
//
//     public render() {
//         return (
//             <div>
//                 <h2>AutoComplete</h2>
//                 <section data-automation-id="AUTO_COMPLETE_DEMO" style={{width: '250px'}}>
//                     <AutoComplete
//                         selectedItem={this.state.selectedItem}
//                         dataSource={items}
//                         onChange={this.onChange}
//                         open={this.state.open}
//                         value={this.state.inputText}
//                     />
//                 </section>
//                 <input value={this.state.inputText} />
//             </div>
//         );
//     }
}
