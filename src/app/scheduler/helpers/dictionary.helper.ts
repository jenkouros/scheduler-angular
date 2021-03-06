export class DictionaryHelper {
  static stringify(dict: { [id: number]: any[] } | undefined) {
    if (!dict) {
      return {
        ids: '',
        values: ''
      };
    }

    const ids: number[] = [];
    const values: string[] = [];
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        ids.push(+key);
        values.push(dict[key].join('|'));
      }
    }
    return {
      ids: ids.join(','),
      values: values.join(',')
    };
  }
}
