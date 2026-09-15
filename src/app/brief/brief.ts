import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Énoncé affiché dans l'application pendant l'exercice.
 * Composant purement présentationnel, à supprimer avant de rendre le test.
 */
@Component({
  selector: 'app-brief',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brief.html',
})
export class Brief {}
