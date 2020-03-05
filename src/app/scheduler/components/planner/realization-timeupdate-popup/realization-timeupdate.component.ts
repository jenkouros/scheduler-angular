import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlannedEventMove, PlannedEvent } from '../../../models/event.model';

@Component({
    selector: 'app-realization-timeupdate-popup',
    templateUrl: './realization-timeupdate.component.html'
})
export class RealizationTimeUpdateComponent {
    @Input() suggestion: {[idPlanItem: number]: PlannedEventMove} | null;
    @Input() planItems: PlannedEvent[] | null;
    @Output() clearTimeRealizationSuggestion = new EventEmitter();
    @Output() resolveTimeRealization = new EventEmitter<PlannedEventMove[]>();

    constructor() {
        this.onClearTimeRealizationSuggestion = this.onClearTimeRealizationSuggestion.bind(this);
        this.onResolveRealization = this.onResolveRealization.bind(this);
    }

    isEmptySuggestion() {
        if (!this.suggestion) {
            return true;
        }
        return Object.keys(this.suggestion).length === 0;
    }

    popupVisibilityChanged(shown: boolean) {
        if (!shown) {
            this.onClearTimeRealizationSuggestion();
        }
    }

    onClearTimeRealizationSuggestion() {
        this.clearTimeRealizationSuggestion.emit();
      }

    onResolveRealization() {
        if (this.suggestion === null) {
            this.onClearTimeRealizationSuggestion();
            return;
        }
        const request: PlannedEventMove[] = [];
        for (const key in this.suggestion) {
            if (this.suggestion.hasOwnProperty(key)) {
                request.push(this.suggestion[key]);
            }
        }
        this.resolveTimeRealization.emit(request);
        this.onClearTimeRealizationSuggestion();
    }
}
