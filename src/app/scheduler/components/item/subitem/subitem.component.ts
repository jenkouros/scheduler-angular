import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { TimeHelper } from '../../../helpers/time.helper';
import { SubItem } from '../../../models/item.dto';
import { ItemFacade } from './../../../store/facade/item.facade';


@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubItemComponent extends AppComponentBase implements OnInit {
  @Input() subItem: SubItem;
  @Input() quantity = 0;

  constructor(private itemFacade: ItemFacade) {
    super();
  }

  ngOnInit() {
  }

  convertTime(minutes: number) {
    return TimeHelper.convertMinutesIntoString(minutes);
  }
  toggleIsPlannable(e) {
    this.subItem.plannable = !this.subItem.plannable;
    this.itemFacade.toggleSubItemPlannable(this.subItem.id, this.subItem.plannable);
  }
}
