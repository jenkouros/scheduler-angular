import { Container } from './container.dto';
import { Select } from './select.model';

export class ContainerSelect extends Container implements Select {
    selected: boolean;
    displayName: string;
    text: string;
    static create(container: Container) {
        const result = new ContainerSelect();
        result.id = container.id;
        result.name = container.name;
        result.code = container.code;
        result.comment = container.comment;
        result.idContainerStatus = container.idContainerStatus;
        result.containerSettings = container.containerSettings;
        result.selected = false;
        result.displayName = container.displayExpression;
        result.text = container.code;
        result.containerSettings = container.containerSettings;
        return result;
    }
}
