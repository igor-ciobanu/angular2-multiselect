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
    multiselectModel: Array<any> = [];
    constructor(store: TaskStore) {
        this.store = store;
    }

}
