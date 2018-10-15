import { Container } from './container.dto';
import { Select } from './select.model';

export class ContainerSelect extends Container implements Select {
    selected: boolean;
    static create(container: Container) {
        const result = new ContainerSelect();
        result.id = container.id;
        result.name = container.name;
        result.code = container.code;
        result.selected = false;
        return result;
    }
}
