import {
    Component, Input, Output, Injectable, Pipe, EventEmitter, ElementRef, OnInit, PipeTransform, OnChanges, SimpleChange
} from 'angular2/core';

const MULTISELECT_TEMPLATE =  `
         <input type="button" class="pt-multiselect-trigger empty-val" [class.empty-val]="isModelEmpty()" value="{{multiselectHeader}}" (click)="toggleSelect()">
         <div class="pt-multiselect-menu-wr" *ngIf="isOpen()" [ngStyle]="{'display': toggleSelectState}">
            <div class="pt-multiselect-menu">
                <div class="pt-multiselect-header">
                    <div class="pt-input-field">
                        <input [(ngModel)]="filterModel" class="pt-input" type="search" autofocus="autofocus" placeholder="Filter">
                    </div>
                    <div *ngIf="isMultiple()" class="pt-multiselect-actions">
                        <a (click)="checkAll()" class="pt-multiselect-action">
                            <svg class="action-icon">
                                <use xlink:href="/src/dest/sprite/multiselect.svg#check_all"></use>
                            </svg>
                            Check all
                        </a>
                        <a (click)="unCheckAll()" class="pt-multiselect-action">
                            <svg class="action-icon">
                                <use xlink:href="/src/dest/sprite/multiselect.svg#uncheck_all"></use>
                            </svg>
                            Uncheck all
                        </a>
                    </div>
                </div>
                <ul class="pt-multiselect-items">
                    <li class="pt-multiselect-item" *ngFor="#item of collection | searchText: filterModel: label" (click)="toggleSelectItem(item)">
                        <i class="pt-checkbox" [class.checked]="isActive(item)"></i>
                        <label class="pt-multiselect-item-label">{{item[label]}}</label>
                    </li>
                </ul>
            </div>
          </div>`

@Pipe({name: "searchText"})
class SearchTextPipe implements PipeTransform {
    transform(items: any, args:string[]) {
        let [searchKey, label] = args;
        if (searchKey == '' || searchKey == undefined) {
            return items;
        }
        return items.filter((item: any) => item[label].toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    }
}

@Injectable()
@Component({
    template: MULTISELECT_TEMPLATE,
    selector: 'multiselect',
    pipes: [SearchTextPipe],
    host: {
        "(document: click)": "handleDocClickEvent($event)",
        "(click)": "trackClickEvent($event)"
    }
})
export class Multiselect implements OnInit, OnChanges {

    @Input('collection') collection: any;
    @Input('multiple') multiple: boolean;
    @Input('label') label: string;
    @Input('trackBy') trackBy: string;
    @Input('header') header: string = 'Select';
    @Input('mutiselectModel') mutiselectModel: any;

    @Output() modelUpdated = new EventEmitter<any>();

    itemStatus: any = {
        selected: {},
        unselected: {}
    };
    multiselectHeader: string = '';
    toggleSelectState: string = 'none';
    hostEvent: any = null;
    states: any = {
        open: false
    };

    constructor(private elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.multiselectHeader = this.header || 'Select';
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (changes['collection'] &&
            changes['collection'].currentValue !== undefined) {
            this.outerCollectionUpdate();
        }
        if (this.collection !== undefined &&
            changes['mutiselectModel'] &&
            changes['mutiselectModel'].currentValue !== undefined) {
            this.outerModelUpdate();
        }
    }

    outerCollectionUpdate() {
        for (var i = 0, len = this.collection.length; i < len; i++) {
            let keyVal = i;
            if (!this.isTrackByIndex()) {
                keyVal = this.collection[i][this.trackBy];
                if (keyVal === undefined) {
                    throw new Error("Item doesn't have such [trackBy] key");
                }
                if (this.itemStatus.unselected[keyVal] !== undefined) {
                    throw new Error("Collection contains duplication using [trackBy] key");
                }
            } else {
                this.collection[i].$$index = keyVal;
            }
            this.itemStatus.unselected[keyVal] = true;
        }
    }

    outerModelUpdate() {
        if (this.isMultiple()) {
            //@todo for multiselect;
            this.updateMultipleHeader();
        } else {
            let key = this.getTrackByKey(this.mutiselectModel);
            if (key !== undefined) {
                this.check(key);
            } else {
                for (let i = 0, keys = Object.keys(this.itemStatus.selected), len = keys.length; i < len; i++) {
                    this.unCheck(keys[i]);
                }
            }
            this.updateSimpleHeader();
        }
    }

    innerModelUpdate() {
        if (this.isMultiple()) {
            this.mutiselectModel = [];
        }
        for (let item of this.collection) {
            if (this.isChecked(this.getTrackByKey(item))) {
                if (!this.isMultiple()) {
                    this.mutiselectModel = item;
                    break;
                }
                this.mutiselectModel.push(item);
            }
        }
        if (this.isMultiple()) {
            this.updateMultipleHeader();
        } else {
            this.updateSimpleHeader();
        }
        this.modelUpdated.emit(this.mutiselectModel);
    }

    toggleSelect() {
        if (!this.isOpen()) {
            this.states.open = true;
            this.toggleSelectState = 'block';
        } else {
            this.states.open = false;
            this.toggleSelectState = 'none';
        }
    }

    isOpen() {
        return this.states.open;
    }

    isModelEmpty() {
        if (this.isMultiple()) {
            return this.mutiselectModel === undefined || this.mutiselectModel.length === 0;
        }
        return this.mutiselectModel === undefined || Object.keys(this.mutiselectModel).length === 0;
    }

    isTrackByIndex() {
        return this.trackBy === undefined || this.trackBy.trim() === '';
    }

    check(key: any) {
        if (this.isChecked(key)) {
            return;
        }
        delete this.itemStatus.unselected[key];
        this.itemStatus.selected[key] = true;
        if (!this.isMultiple()) {
            for (let i = 0, keys = Object.keys(this.itemStatus.selected), len = keys.length; i < len; i++) {
                key != keys[i] && this.unCheck(keys[i]);
            }
        }
    }

    unCheck(key: any) {
        delete this.itemStatus.selected[key];
        this.itemStatus.unselected[key] = true;
    }

    getTrackByKey(item: any) {
        return this.isTrackByIndex() ? item.$$index : item[this.trackBy];
    }

    isMultiple() {
        return this.multiple;
    }

    handleDocClickEvent(event: any) {
        this.hostEvent !== event && this.isOpen() && this.toggleSelect();
    }

    trackClickEvent(event: any) {
        this.hostEvent = event;
    }

    isChecked(key: any) {
        return this.itemStatus.selected[key] === true;
    }

    isActive(item: any) {
        return this.isOpen() && this.isChecked(this.getTrackByKey(item));
    }

    checkAll() {
        for (let i = 0, keys = Object.keys(this.itemStatus.unselected), len = keys.length; i < len; i++) {
            this.check(keys[i]);
        }
        this.innerModelUpdate();
    }

    unCheckAll() {
        for (let i = 0, keys = Object.keys(this.itemStatus.selected), len = keys.length; i < len; i++) {
            this.unCheck(keys[i]);
        }
        this.innerModelUpdate();
    }

    toggleSelectItem(item: any) {
        const itemKey = this.getTrackByKey(item);
        if (this.isChecked(itemKey)) {
            this.isMultiple() && this.unCheck(itemKey);
        } else {
            this.check(itemKey);
        }
        this.innerModelUpdate();
    }

    updateMultipleHeader() {
        if (this.mutiselectModel.length > 0) {
            if (this.mutiselectModel.length === 1) {
                this.multiselectHeader = this.mutiselectModel[0][this.label];
            } else {
                this.multiselectHeader = 'Selected: ' + this.mutiselectModel.length;
            }
        } else {
            this.multiselectHeader = this.header;
        }
    }

    updateSimpleHeader() {
        this.multiselectHeader = this.mutiselectModel[this.label] || this.header;
    }
}