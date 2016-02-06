import {bootstrap} from 'angular2/platform/browser';
import TaskList from './components/app';
import {TaskStore} from './stores/tasklist';

bootstrap(TaskList, [TaskStore]);