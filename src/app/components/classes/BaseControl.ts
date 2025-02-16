import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Type } from '@angular/core';

export function ProvideValueAccessor<T>(component: Type<T>) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}

export abstract class BaseControl<T> implements ControlValueAccessor {
  protected onChange: any = (change: Type<T>) => {};
  protected onTouched: any = () => {};
  protected isDisabled = false;
  protected value?: Type<T>;

  public control: FormControl = new FormControl();

  writeValue(obj: Type<T>): void {
    this.value = obj;
    this.control.setValue(obj, {
      emitEvent: false
    })
    this.control.markAsDirty({
      emitEvent: false
    })
    this.control.markAsTouched({
      emitEvent: false
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
