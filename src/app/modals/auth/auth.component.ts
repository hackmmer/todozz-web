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
  private readonly data = inject(MAT_DIALOG_DATA);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor(
    private _dialog: MatDialogRef<AuthComponent>,
    private _cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.title = this.data.isLogin ? 'Login' : 'SignUp';

    this.form = this._formBuilder.group(
      this.data.isLogin
        ? {
            user: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            pass: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
            ]),
          }
        : {}
    );
  }

  ngOnInit(): void {}

  loginSignup() {
    this.userService
      .login({
        username: this.form.value.user,
        password: this.form.value.pass,
      })
      .subscribe((e) => this.close());
  }

  close() {
    this._dialog.close();
  }
}
