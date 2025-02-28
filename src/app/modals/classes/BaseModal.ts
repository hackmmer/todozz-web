import { MatDialogConfig } from '@angular/material/dialog';

export abstract class BaseModal {
  title!: string;

  close(...args: any[]): void {}
  onClose(): void {}
}

export function MODAL_CONFIG(data?: any): MatDialogConfig {
  return {
    data,
    hasBackdrop: true,
    backdropClass: 'blur',
    width: '22rem',
    enterAnimationDuration: '500ms',
    exitAnimationDuration: '500ms',
  };
}
