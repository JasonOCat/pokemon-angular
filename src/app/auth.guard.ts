import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Le guard a bien été appelé !');
  return true;
};
