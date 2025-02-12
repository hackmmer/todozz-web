import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'share/:key',
    canActivate: [authGuard],
    component: ShareComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
