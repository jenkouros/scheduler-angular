export class PlannedEvent {
    id: number;
    containerId: number;
    title: string;
    description: string;
    start: Date;
    end: Date;

    constructor(
        id: number,
        containerId: number,
        title: string,
        description: string,
        start: Date,
        end: Date
    ) {
        this.id = id;
        this.containerId = containerId;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }
}

