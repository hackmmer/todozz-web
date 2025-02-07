import { Workspace } from './../../interfaces/todo';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseModal } from '../classes/BaseModal';

@Component({
  selector: 'app-delete-item',
  standalone: false,

  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss',
})
export class DeleteItemComponent extends BaseModal implements OnInit {
  private readonly data: {
    kinda: string;
  } = inject(MAT_DIALOG_DATA);
  kindaItem: string = '';

  constructor(private _dialog: MatDialogRef<DeleteItemComponent>) {
    super();
  }
  ngOnInit(): void {
    this.kindaItem = this.data.kinda;
    this.title = `Delete ${this.kindaItem}`;
  }

  override close(status: boolean) {
    this._dialog.close(status);
  }
}
