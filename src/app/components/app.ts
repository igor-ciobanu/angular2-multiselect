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
    multiselectModel: Array<any> = ['2','4'];
    constructor(store: TaskStore) {
        this.store = store;
    }

}
