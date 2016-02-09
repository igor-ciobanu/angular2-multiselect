System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2;
    var SearchTextPipe, Multiselect;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            SearchTextPipe = (function () {
                function SearchTextPipe() {
                }
                SearchTextPipe.prototype.transform = function (items, args) {
                    var searchKey = args[0], label = args[1];
                    if (searchKey == '' || searchKey == undefined) {
                        return items;
                    }
                    return items.filter(function (item) { return item[label].indexOf(searchKey) !== -1; });
                };
                SearchTextPipe = __decorate([
                    core_2.Pipe({
                        name: "searchText"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchTextPipe);
                return SearchTextPipe;
            })();
            Multiselect = (function () {
                function Multiselect() {
                    this.toggleSelectState = 'none';
                    this.multiselectHeader = 'Select';
                    this.modelUpdated = new core_1.EventEmitter();
                }
                Multiselect.prototype.toggleSelect = function () {
                    if (this.toggleSelectState == 'none') {
                        this.toggleSelectState = 'block';
                    }
                    else {
                        this.toggleSelectState = 'none';
                    }
                };
                Multiselect.prototype.checkAll = function () {
                    if (this.multiple != true) {
                        return;
                    }
                    this.collection.forEach(function (t) { return t.checked = true; });
                    this.updateModel();
                };
                Multiselect.prototype.unCheckAll = function () {
                    this.collection.forEach(function (t) { return t.checked = false; });
                    this.updateModel();
                };
                Multiselect.prototype.selectItem = function (item) {
                    if (this.multiple != true) {
                        this.unCheckAll();
                    }
                    item.checked = !item.checked;
                    this.updateModel();
                };
                Multiselect.prototype.updateModel = function () {
                    this.mutiselectModel = [];
                    for (var _i = 0, _a = this.collection; _i < _a.length; _i++) {
                        var value = _a[_i];
                        if (value.checked) {
                            this.mutiselectModel.push(value);
                        }
                    }
                    this.updateHeader();
                    this.modelUpdated.emit(this.mutiselectModel);
                };
                Multiselect.prototype.updateHeader = function () {
                    if (this.mutiselectModel.length > 0) {
                        this.multiselectHeader = this.mutiselectModel.length;
                    }
                    else {
                        this.multiselectHeader = 'Select';
                    }
                };
                __decorate([
                    core_1.Input('collection'), 
                    __metadata('design:type', Object)
                ], Multiselect.prototype, "collection", void 0);
                __decorate([
                    core_1.Input('multiple'), 
                    __metadata('design:type', Boolean)
                ], Multiselect.prototype, "multiple", void 0);
                __decorate([
                    core_1.Input('label'), 
                    __metadata('design:type', String)
                ], Multiselect.prototype, "label", void 0);
                __decorate([
                    core_1.Input('mutiselectModel'), 
                    __metadata('design:type', Object)
                ], Multiselect.prototype, "mutiselectModel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], Multiselect.prototype, "modelUpdated", void 0);
                Multiselect = __decorate([
                    core_1.Component({
                        selector: 'multiselect',
                        pipes: [SearchTextPipe],
                        templateUrl: 'app/templates/multiselect.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], Multiselect);
                return Multiselect;
            })();
            exports_1("Multiselect", Multiselect);
        }
    }
});

//# sourceMappingURL=../../maps/app/components/multiselect.js.map
