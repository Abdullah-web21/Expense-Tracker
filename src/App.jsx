import { useState } from "react";

export default function ExpenseTracker() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const addTransaction = () => {
    const value = Number(amount);
    if (!text || !value) return;

    setTransactions([...transactions, { text, amount: value }]);
    setText("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, b) => a + b.amount, 0);

  const balance = income + expense;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h2 className="text-sm font-semibold">YOUR BALANCE</h2>
      <h1 className="text-3xl font-bold mb-6">${balance.toFixed(2)}</h1>

      <div className="flex justify-between bg-white shadow rounded p-4 mb-6">
        <div className="text-center flex-1">
          <h3 className="font-semibold">INCOME</h3>
          <p className="text-green-500 text-xl">${income.toFixed(2)}</p>
        </div>
        <div className="border-l mx-4" />
        <div className="text-center flex-1">
          <h3 className="font-semibold">EXPENSE</h3>
          <p className="text-red-500 text-xl">${Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>

      <h3 className="font-semibold mb-2">History</h3>
      <ul className="mb-6 space-y-2">
        {transactions.map((t, i) => (
          <li
            key={i}
            className={`flex justify-between bg-gray-50 p-2 border-r-4 ${
              t.amount > 0 ? "border-green-500" : "border-red-500"
            }`}
          >
            <span>{t.text}</span>
            <span>{t.amount > 0 ? "+" : ""}{t.amount}</span>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Add new transaction</h3>

      <div className="mb-3">
        <label className="block text-sm mb-1">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">
          Amount (negative - expense, positive - income)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={addTransaction}
        className="w-full bg-purple-600 text-white py-2 rounded"
      >
        Add transaction
      </button>
    </div>
  );
}