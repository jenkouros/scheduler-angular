import { environment } from '../../../environments/environment';
import { GridStoreConfiguration } from '../models/shared.dto';
import { DictionaryHelper } from '../helpers/dictionary.helper';

export class SearchService {
  getSearchItemsStoreConfiguration(
    idPlan: number,
    search: string,
    filterDictionary: { [id: string]: number[] }
    ): GridStoreConfiguration {

      const dict = DictionaryHelper.stringify(filterDictionary);

      return {
        loadUrl: environment.apiUrl + '/items/searchgrid',
        loadParams: {
              search: search,
              idPlan: idPlan,
              ids: dict.ids,
              values: dict.values
            },
        key: 'idItem'
      };
  }

  getSearchPlanItemsStoreConfiguration(
    idPlan: number,
    search: string,
    filterDictionary: { [id: string]: number[] }
    ): GridStoreConfiguration {
      const dict = DictionaryHelper.stringify(filterDictionary);

      return {
        loadUrl: environment.apiUrl + '/planitems/searchgrid',
        loadParams:
          {
            idPlan: idPlan,
            search: search,
            ids: dict.ids,
            values: dict.values
          }
      };
  }
}
