import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';


export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  const user_role = localStorage.getItem('role');
  const allowed_role =  route.data['roles'];

  const roles = allowed_role;
  
  if (auth.isLoggedIn() && user_role == allowed_role) {
    return true;
  }else if(auth.isLoggedIn() && roles?.includes(user_role)){
    return true
  }
  alert('You Are not allowed here');
  return false;
};
