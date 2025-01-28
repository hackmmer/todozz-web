import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserImgComponent } from './user-img/user-img.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [NavBarComponent, UserImgComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NavBarComponent, UserImgComponent],
})
export class ComponentsModule {}
