import { Helper } from './../../utils/helper';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../modals/auth/auth.component';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ThemeEnum, ThemeString } from '../../enums/storage';
import { MODAL_CONFIG } from '../../modals/classes/BaseModal';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: false,
})
export class NavBarComponent implements OnInit {
  session!: string;

  @Output() themeChange = new EventEmitter<string>();
  protected themes_l = ['Red', 'Blue'];

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.session = this._storageService.getSession() ?? '';
  }

  login() {
    const DialogConfig = MODAL_CONFIG({
      isLogin: true,
    });
    this.matDialog
      .open(AuthComponent, DialogConfig)
      .afterClosed()
      .subscribe((e) => {
        this.session = this._storageService.getSession() ?? '';
        this._router.navigate(['/dashboard']);
        this._cdr.markForCheck();
      });
  }

  logout() {
    this.userService.logout().subscribe((e) => window.location.reload());
  }

  changeTheme(theme: ThemeString) {
    const t = Helper.toThemeEnum(theme.toLowerCase());
    this._storageService.setTheme(t);
    this.themeChange.emit(t);
  }
}
