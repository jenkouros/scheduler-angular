import { GroupFilterServer } from './server/group.servermodel';
import { Filter } from './filter.dto';
import { Container } from './container.dto';
import { FilterSelect } from './filter.viewmodel';
import { ContainerSelect } from './container.viewModel';

export class GroupFilter {
    id: number;
    name: string;
    type: string;
    filters: {id: number, values: number[]}[] = [];
    containers: number[] = [];

    static fromServer(serverData: GroupFilterServer) {
        const result = new GroupFilter();
        result.id = serverData.id;
        result.name = serverData.name;
        result.type = serverData.type;
        result.containers = serverData.containers;
        result.filters = serverData.filters;
        return result;
    }

    // static fromGroupFilterViewModel(viewModel: GroupFilterViewModel) {
    //     const result = new GroupFilter();
    //     result.id = viewModel.id;
    //     result.name = viewModel.name;
    //     result.type = viewModel.type;
    //     result.containers = viewModel.containerSelects.map(c => c.id);
    //     result.filters = viewModel.filterSelects.map(f => {
    //         return {
    //             id: f.id,
    //             values: f.values.map(fv => fv.id)
    //         };
    //     });
    //     return result;
    // }
}

export class GroupFilterViewModel {
    id: number;
    name: string;
    type: string;

    containerSelects: ContainerSelect[];
    filterSelects: FilterSelect[];
    get selectedContainers() {
        return this.containerSelects.filter(i => i.selected);
    }
    get filtersWithSelectedValue() {
        return this.filterSelects.filter(f => f.selectedValues && f.selectedValues.length);
    }

    static create(groupFilter: GroupFilter, filters: Filter[], containers: Container[]) {
        const result = new GroupFilterViewModel();
        result.id = groupFilter.id;
        result.name = groupFilter.name;
        result.type = groupFilter.type;
        result.containerSelects = GroupFilterViewModel.getContainerViewModel(groupFilter, containers);
        result.filterSelects = GroupFilterViewModel.getGroupFilterViewModel(groupFilter, filters);
        return result;
    }

    private static getGroupFilterViewModel(groupFilter: GroupFilter, filters: Filter[]) {
        const result: FilterSelect[] = [];
        filters.forEach(f => {
            const filterSelect = FilterSelect.create(f);
            if (groupFilter.filters) {
                const gf = groupFilter.filters.find(g => g.id === f.id);
                if (gf) {
                    filterSelect.selectValues(gf.values);
                }
            }
            result.push(filterSelect);
        });
        return result;
    }

    private static getContainerViewModel(groupFilter: GroupFilter, containers: Container[]) {
        const result: ContainerSelect[] = [];
        containers.forEach(c => {
            const containerSelect = ContainerSelect.create(c);
            if (groupFilter.containers) {
                containerSelect.selected = groupFilter.containers.findIndex(i => i === c.id) > -1;
            }
            result.push(containerSelect);
        });
        return result;
    }
}
