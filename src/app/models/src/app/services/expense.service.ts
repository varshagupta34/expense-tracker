import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<Expense[]>([
    { id: 1, title: 'Groceries', category: 'Food', amount: 1200, date: '2026-05-01' },
    { id: 2, title: 'Bus pass', category: 'Transport', amount: 500, date: '2026-05-03' },
    { id: 3, title: 'Movie', category: 'Entertainment', amount: 300, date: '2026-05-05' },
  ]);

  expenses$ = this.expensesSubject.asObservable();

  total$ = this.expenses$.pipe(
    map(expenses => expenses.reduce((sum, e) => sum + e.amount, 0))
  );

  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }

  addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense = { ...expense, id: Date.now() };
    this.expensesSubject.next([...this.expensesSubject.value, newExpense]);
  }

  deleteExpense(id: number) {
    this.expensesSubject.next(
      this.expensesSubject.value.filter(expense => expense.id !== id)
    );
  }
}
