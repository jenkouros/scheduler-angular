import { Container } from './container.dto';

export class ContainerSelect extends Container {
    selected: boolean;
    constructor(container: Container) {
        super();
        this.id = container.id;
        this.name = container.name;
        this.code = container.code;
        this.selected = false;
    }
}
