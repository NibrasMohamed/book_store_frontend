import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const auth = inject(AuthService)
  const router = new Router;
  
  if (auth.isLoggedIn()) {
    console.log('[auth check]');
    
    return true;
  }else{
    router.navigate(['login']);
    return false;
    
  }
};
