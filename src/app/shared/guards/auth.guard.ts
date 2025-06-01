import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from '../shared-service';

export const authGuard: CanActivateFn = () => {
  const _sharedService = inject(SharedService);
  const router = inject(Router);
  if (_sharedService.getIsUserLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
