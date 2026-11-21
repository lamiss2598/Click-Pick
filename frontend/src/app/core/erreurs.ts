import { HttpErrorResponse } from '@angular/common/http';

/** Transforme une erreur HTTP en message lisible pour l'utilisateur. */
export function messageErreur(erreur: unknown, parDefaut = 'Une erreur est survenue. Veuillez réessayer.'): string {
  if (erreur instanceof HttpErrorResponse) {
    if (erreur.status === 0) {
      return 'Impossible de joindre le serveur. Vérifiez que le backend est démarré.';
    }
    const corps = erreur.error;
    if (typeof corps === 'string' && corps.trim()) {
      return corps;
    }
    if (corps && typeof corps.message === 'string' && corps.message.trim()) {
      return corps.message;
    }
    if (erreur.status === 401) {
      return 'Identifiants incorrects ou session expirée.';
    }
    if (erreur.status === 403) {
      return 'Vous n\'avez pas l\'autorisation d\'effectuer cette action.';
    }
    if (erreur.status === 409) {
      return 'Cette opération entre en conflit avec des données existantes (email déjà utilisé, par exemple).';
    }
  }
  return parDefaut;
}
