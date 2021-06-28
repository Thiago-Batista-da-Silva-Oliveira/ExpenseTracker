import {useContext} from 'react'
import {ExpenseTrackerContext} from './context/context'

import {incomeCategories, expenseCategories,resetCategories} from './constants/categories'

/*
[
     {id: 1, type: "Expense", amount: 50, category: "Salary"} if the title is 'Income', this should be deleted
     {id: 1, type: "Income", amount: 50, category: "Salary"}
     {id: 1, type: "Income", amount: 50, category: "Salary"}
     {id: 1, type: "Income", amount: 50, category: "Business"}
]
*/

/*
   export const incomeCategories = [
       { type: "Salary", amount: 0, color: "incomeColors[0]"}
       { type: "Business", amount: 0, color: "incomeColors[0]"}
       { type: "Investments", amount: 0, color: "incomeColors[1]"}
       { type: "Extra Income", amount: 0, color: "incomeColors[2]"}
   ]
*/

const useTransactions = (title) => {
    resetCategories()
    const {transactions} = useContext(ExpenseTrackerContext)
    const transactionsPerType = transactions.filter((t) => t.type=== title)
    const total = transactionsPerType.reduce((a,c) => a += c.amount,0)
    const categories = title === 'Income' ? incomeCategories : expenseCategories

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)
        if(category) category.amount += t.amount
    })

    const filteredCategories = categories.filter((c) => c.amount > 0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor:filteredCategories.map((c) => c.color)
        }],
        labels: filteredCategories.map((c) => c.type)
    }

    return { total, chartData}
}

export default useTransactions