import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId: Object = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const userServive = inject(UserService);
    const router = inject(Router);
    if (!userServive.isLogedIn()) router.navigate(['/']);
  }
  return true;
};
