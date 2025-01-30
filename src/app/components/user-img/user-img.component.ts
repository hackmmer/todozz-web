import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-img',
    templateUrl: './user-img.component.html',
    styleUrl: './user-img.component.scss',
    standalone: false
})
export class UserImgComponent {
  @Input('mat-menu') MatMenu?: any;
}
