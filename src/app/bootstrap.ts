import {bootstrap} from 'angular2/platform/browser';
import {TaskStore} from './stores/tasklist';
import Overview from './components/overview';

bootstrap(Overview, [TaskStore]);