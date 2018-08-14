import { environment } from '../../../environments/environment';
import { GridStoreConfiguration } from '../models/shared.dto';

export class SearchService {

    getSearchItemsStoreConfiguration(search: string): GridStoreConfiguration {
        return {
            loadUrl: environment.apiUrl + '/items/searchgrid',
            loadParams: search === ''
                ? undefined
                : {
                    search: search
                },
            key: 'idItem'
        };
    }

    getSearchPlanItemsStoreConfiguration(search: string): GridStoreConfiguration {
        return {
            loadUrl: environment.apiUrl + '/planitems/searchgrid',
            loadParams: search === ''
                ? undefined
                : {
                    search: search
                }
        };
    }
}
