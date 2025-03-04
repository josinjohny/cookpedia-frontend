import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    //authorized user
    return true;
  }else{
    alert("unauthorized access .. please login")
    router.navigateByUrl('/login')
    return false
  }

  
};
