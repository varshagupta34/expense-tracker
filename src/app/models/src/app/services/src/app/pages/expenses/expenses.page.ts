import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';

@Component({
  standalone: true,
  selector: 'app-expenses-page',
  imports: [CommonModule, CurrencyPipe, FormsModule],
  template: `
    <h2>Expenses</h2>

    <p><strong>Total Spent:</strong> {{ total | currency:'INR' }}</p>

    <label>
      Filter by category:
      <select [(ngModel)]="selectedCategory" name="categoryFilter">
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </label>

    <ul style="margin-top:16px;">
      @for (expense of filteredExpenses; track expense.id) {
        <li style="margin:8px 0; padding:8px; border:1px solid #ddd; list-style:none;">
          <div><strong>{{ expense.title }}</strong></div>
          <div>Category: {{ expense.category }}</div>
          <div>Date: {{ expense.date }}</div>
          <div>Amount: {{ expense.amount | currency:'INR' }}</div>
          <button type="button" (click)="delete(expense.id)">Delete</button>
        </li>
      } @empty {
        <li>No expenses found.</li>
      }
    </ul>
  `,
})
export class ExpensesPageComponent {
  private service = inject(ExpenseService);

  selectedCategory = 'All';
  expenses: Expense[] = [];
  total = 0;

  constructor() {
    this.loadData();
    this.service.total$.subscribe(value => (this.total = value));
  }

  loadData() {
    this.expenses = this.service.getExpenses();
  }

  get filteredExpenses() {
    if (this.selectedCategory === 'All') {
      return this.expenses;
    }
    return this.expenses.filter(e => e.category === this.selectedCategory);
  }

  delete(id: number) {
    this.service.deleteExpense(id);
    this.loadData();
  }
}
