import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav style="display:flex; gap:12px; padding:12px; border-bottom:1px solid #ccc;">
      <a routerLink="/">Expenses</a>
      <a routerLink="/add">Add Expense</a>
    </nav>

    <div style="padding:16px;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
