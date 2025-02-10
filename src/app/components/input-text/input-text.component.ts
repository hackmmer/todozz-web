import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BaseControl, ProvideValueAccessor } from '../classes/BaseControl';

@Component({
  selector: 'app-input-text',
  standalone: false,

  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  // providers: [ProvideValueAccessor(InputTextComponent)],
})
export class InputTextComponent
  extends BaseControl<string>
  implements OnInit, OnDestroy
{
  protected hiddeLabel: boolean = false;

  @Input() name: string = 'ControlName';
  @Input() type: string = 'text';

  @Input() rows?:number = 10;
  @Input() cols?:number = 35;

  private sub!: Subscription;

  constructor(@Self() private ngControl: NgControl) {
    super();
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.sub = this.control.valueChanges.subscribe((e) => {
      if (!e)
        this.control.reset(e);
      this.onChange(e);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  focus(v: boolean) {
    this.hiddeLabel = v;
  }
}
