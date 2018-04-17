// TODO REMOVE THIS FILE

export class PlannerService {
    static readonly url = 'http://localhost:3000/events';
    constructor() {}

    static getDataSource() {
        return {
            batch: true,
            transport: this.getTransportObject(),
            schema: this.getSchemaObject()
        };
    }

    static getTransportObject() {
        return {
            read: {
                url: this.url,
                dataType: 'json'
            },
            update: {
                url: '',
                dataType: 'jsonp'
            },
            create: {
                url: '',
                dataType: 'jsonp'
            },
            destroy: {
                url: '',
                dataType: 'jsonp'
            },
            parameterMap: function(options, operation) {
                if (operation !== 'read' && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        };
    }

    static getSchemaObject() {
        return {
            model: {
                id: 'taskId',
                fields: {
                    taskId: { from: 'TaskID', type: 'number' },
                    title: { from: 'Title', defaultValue: 'No title', validation: { required: true } },
                    start: { type: 'date', from: 'Start' },
                    end: { type: 'date', from: 'End' },
                    startTimezone: { from: 'StartTimezone' },
                    endTimezone: { from: 'EndTimezone' },
                    description: { from: 'Description' },
                    recurrenceId: { from: 'RecurrenceID' },
                    recurrenceRule: { from: 'RecurrenceRule' },
                    recurrenceException: { from: 'RecurrenceException' },
                    ownerId: { from: 'OwnerID', defaultValue: 1 },
                    isAllDay: { type: 'boolean', from: 'IsAllDay' }
                }
            }
        };
    }

    static getViewsObject() {
        return [
            { type: 'day' },
            { type: 'week', selected: true },
            { type: 'month' },
            { type: 'agenda'}
        ];
    }
}
