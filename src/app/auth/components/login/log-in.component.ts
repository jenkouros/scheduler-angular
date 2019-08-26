import { GroupFilterViewModel } from './../../../scheduler/models/groupfilter.dto';

import { Schedule } from './../../../worktime/models/timetable.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services';
import { AppComponentBase } from '../../../shared/app-component-base';
import { Store, select } from '@ngrx/store';
import * as fromStore from './../../../scheduler/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-log-in',
    templateUrl: 'login.component.html'})
export class LogInComponent extends AppComponentBase implements OnInit {
    groups: GroupFilterViewModel[] | null;

    loginForm: FormGroup;
    // loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private store: Store<fromStore.SchedulerState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
            super();
        }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.store.dispatch(new fromStore.LoadGroupCodelistFilter());
        this.store.dispatch(new fromStore.LoadGroupCodeListContainer());
        this.store.dispatch(new fromStore.LoadGroups());
        this.store.pipe(
          select(fromStore.selectGroupViewModelList)
        ).subscribe(v => this.groups = v);
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        // this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data != null) {
                      if (data.defaultGroupId) {
                        this.selectDefaultGroup(data.defaultGroupId);
                      } else {
                        this.store.dispatch(new fromStore.ChangeFilter({}));
                        this.store.dispatch(new fromStore.ChangeContainersFilter([]));
                      }
                      this.router.navigate([this.returnUrl]);
                    }

                },
                error => {
                    this.error = 'Uporabniško ime ali geslo je napačno';
                    // this.loading = false;
                });
    }

    selectDefaultGroup(id: number) {
      if (!this.groups) { return; }
      const selectedGroupIdx = this.groups.findIndex(i => i.id === id);
      if (selectedGroupIdx >= 0) {
        const dict: {[id: number]: number[]} = {};
        this.groups[selectedGroupIdx].filtersWithSelectedValue.forEach(f => {
            dict[f.id] = f.selectedValues.map(fv => fv.id);
        });

        this.store.dispatch(new fromStore.ChangeContainersFilter(this.groups[selectedGroupIdx].selectedContainers));
        this.store.dispatch(new fromStore.ChangeFilter(dict));
        this.store.dispatch(new fromStore.LoadPreplanItems());
      }
    }
}
