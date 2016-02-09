System.register([], function(exports_1) {
    var TaskItem, TaskStore;
    return {
        setters:[],
        execute: function() {
            TaskItem = (function () {
                function TaskItem(data) {
                    if (data === void 0) { data = undefined; }
                    data = data || { id: 0, summary: '' };
                    this.id = data.id;
                    this.summary = data.summary;
                }
                return TaskItem;
            })();
            exports_1("TaskItem", TaskItem);
            TaskStore = (function () {
                function TaskStore() {
                    this.tasks = '[{"id": "1", "summary":"Summary 1"}, {"id":"2", "summary":"Summary 2"}, {"id": "3", "summary": "Summary 3"}, {"id": "4",  "summary":"Summary 4"}, {"id": "5", "summary":"Summary 5"}]';
                    var storedItems = JSON.parse(this.tasks);
                    this.items = storedItems.map(function (i) { return new TaskItem(i); });
                }
                return TaskStore;
            })();
            exports_1("TaskStore", TaskStore);
        }
    }
});

//# sourceMappingURL=../../maps/app/stores/tasklist.js.map
