import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../modals/auth/auth.component';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: false,
})
export class NavBarComponent implements OnInit {
  session?: string;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (isPlatformBrowser(this.platformId))
      this.session = sessionStorage.getItem('Session') ?? '';
  }

  login() {
    const dialogRef = this.matDialog.open(AuthComponent, {
      data: {
        isLogin: true,
      },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialogRef.afterClosed().subscribe((e) => {
      this.session = sessionStorage.getItem('Session') ?? '';
      this._router.navigate(['/dashboard']);
      this._cdr.markForCheck();
    });
  }

  logout() {
    this.userService.logout().subscribe(e => window.location.reload());
  }
}
