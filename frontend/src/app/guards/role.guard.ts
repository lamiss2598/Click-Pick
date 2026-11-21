import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Role } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';

/** Autorise l'accès uniquement aux utilisateurs connectés ayant le rôle demandé. */
export const roleGuard = (role: Role): CanActivateFn => (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estConnecte && auth.aLeRole(role)) {
    return true;
  }
  return router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });
};
