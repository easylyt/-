let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        showAmountInput(category);
    });
});

document.getElementById('view-records').addEventListener('click', showExpenseRecords);

function showAmountInput(category) {
    const amount = prompt(`请输入${category}的消费金额：`);
    if (amount !== null && amount.trim() !== '') {
        const expense = {
            category: category,
            amount: parseFloat(amount),
            date: new Date().toISOString()
        };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        alert('记录已保存！');
    }
}

function showExpenseRecords() {
    let recordsHTML = '<h2>消费记录</h2>';
    if (expenses.length === 0) {
        recordsHTML += '<p>暂无消费记录</p>';
    } else {
        recordsHTML += '<ul>';
        expenses.forEach(expense => {
            recordsHTML += `<li>${new Date(expense.date).toLocaleDateString()} - ${expense.category}: ¥${expense.amount.toFixed(2)}</li>`;
        });
        recordsHTML += '</ul>';
    }
    document.body.innerHTML = recordsHTML + '<button onclick="location.reload()">返回首页</button>';
}