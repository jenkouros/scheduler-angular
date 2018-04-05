import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loaderActive: boolean = false;

    showLoader() {
        this.loaderActive = true;
        console.log(this.loaderActive);
    }

    hideLoader() {
        this.loaderActive = false;
        console.log(this.loaderActive);
    }
}
