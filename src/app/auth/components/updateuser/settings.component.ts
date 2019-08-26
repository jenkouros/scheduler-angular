import { SettingsEnum } from './settings.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { appSettings } from '../../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends AppComponentBase {

  SettingsEnum = SettingsEnum;
  activeTab = SettingsEnum.ChangePassword;
  private nav = [
    {
      settings: SettingsEnum.ChangePassword,
      text: this.translate('Password'),
      show: true
    },
    {
      settings: SettingsEnum.ChooseDefaultGroup,
      text: this.translate('Group'),
      show: appSettings.Menu_Scheduler_Groups
    }
  ];

  get tabs() {
    return this.nav.filter(i => i.show);
  }

}



