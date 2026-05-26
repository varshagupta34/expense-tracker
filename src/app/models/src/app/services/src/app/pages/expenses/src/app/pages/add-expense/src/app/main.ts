import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ExpensesPageComponent } from './app/pages/expenses/expenses.page';
import { AddExpensePageComponent } from './app/pages/add-expense/add-expense.page';

const routes: Routes = [
  { path: '', component: ExpensesPageComponent },
  { path: 'add', component: AddExpensePageComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
