import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  title!: string;
  login: boolean;
  private readonly data = inject(MAT_DIALOG_DATA);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor(
    private _dialog: MatDialogRef<AuthComponent>,
    private _cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.login = this.data.isLogin;
    this.title = this.login ? 'Sign in' : 'Sign Up';

    this.form = this._formBuilder.group(
      this.login
        ? {
            username: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            pass: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
            ]),
          }
        : {
            username: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            pass: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
            ]),
          }
    );
  }

  ngOnInit(): void {}

  loginSignup() {
    if (this.login) {
      this.userService
        .login({
          username: this.form.value.username,
          password: this.form.value.pass,
        })
        .subscribe((e) => this.close());
    } else {
      this.userService
        .register({
          username: this.form.value.username,
          name: this.form.value.username,
          password: this.form.value.pass,
        })
        .subscribe((e) => this.close());
    }
  }

  close() {
    this._dialog.close();
  }
}
