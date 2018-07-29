import { Component, Input } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-items-search',
    templateUrl: './items-search.component.html'
})
export class ItemsSearchComponent {
    @Input() store: CustomStore;
}
