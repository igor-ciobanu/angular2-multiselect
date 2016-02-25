##Angular 2 Multiselect component

####Installation

- Clone repository
- Install nodejs
- Run npm install
- Run gulp build task

####Usage
```html
<multiselect 
  (modelUpdated)="parentCompoentMethod($event)" 
  [multiple]="true" 
  [collection]="items" 
  [label]="'item_key'" 
  [mutiselectModel]="multiselectModel">
</multiselect>
```

```js
import {Multiselect} from './multiselect';
...

@Component({
    selector: 'demo-component',
    ...
    directives: [Multiselect]
})

export default class DemoComponent {
    ...
    multiselectModel: Array<any> = [];
    parentCompoentMethod(multiselectModel: any) {
        this.multiselectModel1 = multiselectModel;
    }
}
```

####API Documentation
| Attribute  Name | Type | Description |
| --- | --- | --- |
| multiple | true/false| If value is true we can select many items, if false only one item |
| collection | array | A list of objects for multiselect |
| label | string | Key of a object which will be displayed  for item |
| header | string | Header of multiselect (Default value 'Select')  |
| mutiselectModel | array/object | Value of model from used component |
| modelUpdated | function  | Function from used compoent which will update 'multiselectModel' value  |

#### Demo & How To 
Go to http://igariok1990.github.io/angular2-multiselect/

### Licence
The MIT License (MIT)


