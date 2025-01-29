import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ServicesModule,
    ComponentsModule,
  ],
  exports: [DashboardComponent],
})
export class PagesModule {}
