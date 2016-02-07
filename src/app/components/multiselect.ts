import {Component, Input} from 'angular2/core';
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: "searchText"
})

class SearchTextPipe implements PipeTransform{
    transform(items: any, args:string[]) {
        let [searchKey, label] = args;
        if (searchKey == '' || searchKey == undefined) {
            return items;
        }
        return items.filter((item: any) => item[label].indexOf(searchKey) !== -1);
    }
}

@Component({
    selector: 'multiselect',
    pipes: [SearchTextPipe],
    templateUrl: 'app/templates/multiselect.html',
})

export class Multiselect {
    toggleSelectState: string = 'none';
    multiselectHeader: string = 'Select';
    
    @Input('collection') collection: any;
    @Input('multiple') multiple: boolean;
    @Input('label') label: string;
    @Input('mutiselectModel') mutiselectModel: any;

    toggleSelect() {
        if (this.toggleSelectState == 'none') {
           this.toggleSelectState = 'block';
        } else {
           this.toggleSelectState = 'none';
        }
    }

    checkAll() {
        if (this.multiple != true) {
            return;
        }
        this.collection.forEach((t: any) => t.checked = true);
        this.updateModel();
    }

    unCheckAll() {
        this.collection.forEach((t: any) => t.checked = false);
        this.updateModel();
    }

    selectItem(item: any) {
        if (this.multiple != true) {
            this.unCheckAll();
        }
        item.checked = !item.checked;
        this.updateModel();
    }

    updateModel() {
        this.mutiselectModel = [];
        for (let value of this.collection) {
            if (value.checked) {
                this.mutiselectModel.push(value);
            }
        }
        this.updateHeader()
    }

    updateHeader() {
        if (this.mutiselectModel.length > 0) {
            this.multiselectHeader = this.mutiselectModel.length
        } else {
            this.multiselectHeader = 'Select';
        }
    }
}