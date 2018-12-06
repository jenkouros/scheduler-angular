import { environment } from '../../../environments/environment';
import { GridStoreConfiguration } from '../models/shared.dto';

export class SearchService {
  getSearchItemsStoreConfiguration(idPlan: number, search: string): GridStoreConfiguration {
    return {
      loadUrl: environment.apiUrl + '/items/searchgrid',
      loadParams:
        search === ''
          ? undefined
          : {
              idPlan: idPlan,
              search: search
            },
      key: 'idItem'
    };
  }

  getSearchPlanItemsStoreConfiguration(idPlan: number, search: string): GridStoreConfiguration {
    return {
      loadUrl: environment.apiUrl + '/planitems/searchgrid',
      loadParams:
        search === ''
          ? undefined
          : {
              idPlan: idPlan,
              search: search
            }
    };
  }
}
