export class TaskItem {
    id: number;
    username: string;
    version: string;
    summary: string;

    constructor(data: any = undefined) {
        data = data || { id:0, summary: '', version: '', username: '' };
        this.id = data.id;
        this.username = data.username;
        this.version = data.version;
        this.summary = data.summary;
    }
}

export class TaskStore {

    items : Array<TaskItem>;
    tasks: string = '[{"id": "1", "username": "iciobanu", "version": "DEVELOP", "summary":"Summary 1"}, {"id":"2", "username": "rpavelco", "version":"TESTING", "summary":"Summary 2"}, {"id": "3", "username": "vmardari", "version": "DEVELOP", "summary": "Summary 3"}, {"id": "4", "username": "iciobanu", "version": "RELEASE", "summary":"Summary 4"}, {"id": "5", "username":"vmardari", "version":"RELEASE", "summary":"Summary5"}]';

    constructor() {
        const storedItems = <Array<any>> JSON.parse(this.tasks);
        this.items = storedItems.map(i => new TaskItem(i));
    }

}