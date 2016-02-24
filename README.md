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
| mutiselectModel | array/object | Value of model from used component |
| modelUpdated | function  | Function from used compoent which will update 'multiselectModel' value  |

#### Demo & How To 
Go to http://igariok1990.github.io/angular2-multiselect/

### Licence
Released under the MIT license:

The MIT License (MIT)

Copyright (c) 2014-2015 Ignatius Steven (https://github.com/isteven)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
