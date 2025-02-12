import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IWorkspace } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';
import { ShareService } from '../../services/share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
})
export class ShareComponent implements OnInit {
  isLoading: boolean = true;
  workspace!: IWorkspace;

  constructor(
    private router: ActivatedRoute,
    private _shareService: ShareService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.params.subscribe((e: any) => {
      this._shareService.getItemFrom(e['key']).subscribe((w) => {
        this.workspace = w;
        this._switchLoading();
      });
    });
  }

  private _switchLoading() {
    this.isLoading = !this.isLoading;
    this._cdr.detectChanges();
  }

}
