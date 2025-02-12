import { Helper } from './../../../utils/helper';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWorkspace } from '../../../interfaces/todo';
import { TodoService } from '../../../services/todo.service';
import { environment } from '../../../../environments/environment.development';
import { FormControl, FormGroup } from '@angular/forms';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-share-workspace',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './share-workspace.component.html',
  styleUrl: './share-workspace.component.scss',
})
export class ShareWorkspaceComponent implements OnInit {
  title: string;
  link: string;
  isLoading: boolean = true;
  private readonly data: {
    workspace: IWorkspace;
  } = inject(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    link: new FormControl(''),
  });

  constructor(
    private _dialog: MatDialogRef<ShareWorkspaceComponent>,
    private _todo: TodoService,
    private _shareService: ShareService,
    private _cdr: ChangeDetectorRef
  ) {
    this.title = `Share "${this.data.workspace.title}"`;
    this.link = '';
  }

  ngOnInit(): void {
    this._shareService.createLinkFor(this.data.workspace).subscribe((e) => {
      this.link = `${environment.host}/share/${e.token}`;
      this.form.controls['link'].setValue(this.link);
      this._switchLoading();
    });
    this.form.controls['link'].valueChanges.subscribe((e) => {
      this.form.controls['link'].setValue(this.link, { emitEvent: false });
    });
  }

  private _switchLoading() {
    this.isLoading = !this.isLoading;
    this._cdr.detectChanges();
  }

  async copy() {
    // Copy the text inside the text field
    await navigator.clipboard.writeText(this.link);
  }
}
