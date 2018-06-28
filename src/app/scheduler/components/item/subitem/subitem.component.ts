import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubItem } from '../../../models/item.dto';
import { TimeHelper } from '../../../helpers/time.helper';


@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubItemComponent implements OnInit {
  @Input() subItem: SubItem;
  @Input() quantity = 0;

  ngOnInit() {
  }

  convertTime(minutes: number) {
    return TimeHelper.convertMinutesIntoString(minutes);
  }

}
