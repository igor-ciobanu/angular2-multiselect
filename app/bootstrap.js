System.register(['angular2/platform/browser', './components/app', './stores/tasklist'], function(exports_1) {
    var browser_1, app_1, tasklist_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (tasklist_1_1) {
                tasklist_1 = tasklist_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.default, [tasklist_1.TaskStore]);
        }
    }
});

//# sourceMappingURL=../maps/app/bootstrap.js.map
