import {Component} from 'angular2/core';
import {TaskStore} from './../stores/tasklist';
import {Multiselect} from './multiselect';

@Component({
    selector: 'task-list',
    templateUrl: 'app/templates/app.html',
    styleUrls: ['app/assets/app.css'],
    directives: [Multiselect]
})

export default class TaskList {
    store: TaskStore;
    multiselectModel1: Array<any> = [];
    multiselectModel2: Array<any> = [];
    constructor(store: TaskStore) {
        this.store = store;
    }

    updateModel1(multiselectModel: any) {
        this.multiselectModel1 = multiselectModel;
        console.log(multiselectModel);
    }

    updateModel2(multiselectModel: any) {
        this.multiselectModel2 = multiselectModel;
        console.log(multiselectModel);
    }

    renderModel(model: any) {
        return JSON.stringify(model);
    }

}
