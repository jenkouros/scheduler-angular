export class Container {
    id: number;
    code: string;
    name: string;
}

export class ContainerSelect extends Container {
    selected: boolean;
    constructor(container: Container) {
        super();
        this.name = container.name;
        this.id = container.id;
        this.code = container.code;
        this.selected = false;
    }
}