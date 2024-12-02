import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        type: 'Income' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo(prev => ({ ...prev, [name]: value }));
    };

    const addExpenses = (e) => {
        e.preventDefault();
        const { amount, text, type } = expenseInfo;
        if (!amount || !text) {
            handleError('Please add all details (Text, Amount, and Type).');
            return;
        }
        if (isNaN(amount) || Number(amount) === 0) {
            handleError('Please enter a valid amount.');
            return;
        }
        const transaction = {
            text,
            amount: type === 'Expense' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
            type
        };
        addTransaction(transaction);
        setExpenseInfo({ amount: '', text: '', type: 'Income' }); // Reset form
    };

    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <form onSubmit={addExpenses}>
                <div>
                    <label htmlFor="text">Detail</label>
                    <input
                        type="text"
                        name="text"
                        placeholder="Enter your Expense Detail..."
                        value={expenseInfo.text}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group transaction-type">
                    <label htmlFor="type" className="transaction-type-label">Type</label>
                    <select
                        className="transaction-type-select"
                        name="type"
                        value={expenseInfo.type}
                        onChange={handleChange}
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter your Amount..."
                        value={expenseInfo.amount}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default ExpenseForm;
