import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';

@Component({
  standalone: true,
  selector: 'app-add-expense-page',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Add Expense</h2>

    <form [formGroup]="expenseForm" (ngSubmit)="submit()" style="display:grid; gap:12px; max-width:400px;">
      <div>
        <label>Title</label><br />
        <input type="text" formControlName="title" />
        <small *ngIf="expenseForm.get('title')?.touched && expenseForm.get('title')?.invalid">
          Title is required
        </small>
      </div>

      <div>
        <label>Amount</label><br />
        <input type="number" formControlName="amount" />
        <small *ngIf="expenseForm.get('amount')?.touched && expenseForm.get('amount')?.invalid">
          Amount must be greater than 0
        </small>
      </div>

      <div>
        <label>Category</label><br />
        <select formControlName="category">
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
        </select>
        <small *ngIf="expenseForm.get('category')?.touched && expenseForm.get('category')?.invalid">
          Category is required
        </small>
      </div>

      <div>
        <label>Date</label><br />
        <input type="date" formControlName="date" />
        <small *ngIf="expenseForm.get('date')?.touched && expenseForm.get('date')?.invalid">
          Date is required
        </small>
      </div>

      <button type="submit" [disabled]="expenseForm.invalid">Add Expense</button>
    </form>
  `,
})
export class AddExpensePageComponent {
  private service = inject(ExpenseService);
  private fb = inject(FormBuilder);

  expenseForm = this.fb.group({
    title: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    date: ['', Validators.required],
  });

  submit() {
    if (this.expenseForm.invalid) return;

    const value = this.expenseForm.value;
    this.service.addExpense({
      title: value.title ?? '',
      amount: Number(value.amount ?? 0),
      category: value.category ?? '',
      date: value.date ?? '',
    });

    this.expenseForm.reset();
  }
}
