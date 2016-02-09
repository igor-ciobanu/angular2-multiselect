System.register(['angular2/core', './../stores/tasklist', './multiselect'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tasklist_1, multiselect_1;
    var TaskList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tasklist_1_1) {
                tasklist_1 = tasklist_1_1;
            },
            function (multiselect_1_1) {
                multiselect_1 = multiselect_1_1;
            }],
        execute: function() {
            TaskList = (function () {
                function TaskList(store) {
                    this.multiselectModel1 = [];
                    this.multiselectModel2 = [];
                    this.store = store;
                }
                TaskList.prototype.updateModel1 = function (multiselectModel) {
                    this.multiselectModel1 = multiselectModel;
                    console.log(multiselectModel);
                };
                TaskList.prototype.updateModel2 = function (multiselectModel) {
                    this.multiselectModel2 = multiselectModel;
                    console.log(multiselectModel);
                };
                TaskList.prototype.renderModel = function (model) {
                    return JSON.stringify(model);
                };
                TaskList = __decorate([
                    core_1.Component({
                        selector: 'task-list',
                        templateUrl: 'app/templates/app.html',
                        styleUrls: ['app/assets/app.css'],
                        directives: [multiselect_1.Multiselect]
                    }), 
                    __metadata('design:paramtypes', [tasklist_1.TaskStore])
                ], TaskList);
                return TaskList;
            })();
            exports_1("default", TaskList);
        }
    }
});

//# sourceMappingURL=../../maps/app/components/app.js.map
