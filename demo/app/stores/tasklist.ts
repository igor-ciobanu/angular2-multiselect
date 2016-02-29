export class TaskItem {
    id: number;
    summary: string;

    constructor(data: any = undefined) {
        data = data || { id:0, summary: '' };
        this.id = data.id;
        this.summary = data.summary;
    }
}

export class TaskStore {

    items : Array<TaskItem>;
    tasks: string = '[{"id": "1", "summary":"Summary 1"}, {"id":"2", "summary":"Summary 2"}, {"id": "3", "summary": "Summary 3"}, {"id": "4",  "summary":"Summary 4"}, {"id": "5", "summary":"Summary 5"}]';

    constructor() {
        const storedItems = <Array<any>> JSON.parse(this.tasks);
        this.items = storedItems.map(i => new TaskItem(i));
    }

}