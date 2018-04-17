export class PlannedEvent {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;

    constructor(
        id: number,
        title: string,
        description: string,
        start: Date,
        end: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }
}

