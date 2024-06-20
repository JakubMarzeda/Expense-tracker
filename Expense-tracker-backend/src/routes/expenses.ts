import express, { Request, Response } from 'express'
import ExpenseModel from '../models/expense'
import { createExpenseValidator, ObjectIdValidator } from "../middlewares/expensesValidator"

const expensesRouter = express.Router()

expensesRouter.get("/raport", async (request: Request, response: Response) => {
    try {
        let expenses = await ExpenseModel.find()
        let { category } = request.query
        let totalExpenses = 0

        if (category){
            expenses = expenses.filter(expense => expense.category === category)
        }
        expenses.forEach(expense => {
            totalExpenses += expense.amount
        })
        
        return response.status(200).json({ totalExpenses })
    } catch (error) {
        return response.status(500).send(error)
    }
})

expensesRouter.get("/", async (request: Request<{}, {}, {}, {
    category?: string
    order?: string,
    sortBy?: string
}>, response: Response) => {
    try {
        let { category, order, sortBy } = request.query
        let query = {};

        if (category) {
            const uniqueCategories = await ExpenseModel.distinct("category");

            if (!uniqueCategories.includes(category)) {
                return response.status(400).send("Category doesn't exist");
            }

            query = { ...query, category: category };
        }

        let expensesQuery = ExpenseModel.find(query);

        if (sortBy && order && (order === "asc" || order === "desc")) {
            const allowedSorts = ["title", "amount", "createdAt"];

            if (!allowedSorts.includes(sortBy)) {
                return response.status(400).send("Field to sort doesn't exist")
            }

            const sortDirection = order === 'asc' ? 1 : -1;
            expensesQuery = expensesQuery.sort({ [sortBy]: sortDirection });
        }

        let expenses = await expensesQuery.exec();

        return response.status(200).send(expenses)
    } catch (error) {
        return response.status(500).send(error)
    }
})



expensesRouter.get("/:id", ObjectIdValidator,async (request: Request, response: Response) => {
    try {
        const expenseId = request.params.id;
        const expense = await ExpenseModel.findById(expenseId)
        
        return response.status(200).send(expense)
    } catch (error) {
        return response.status(500).send(error)
    }
})


expensesRouter.post("/", createExpenseValidator, async (request: Request, response: Response) => {
    try{
        const newExpense = new ExpenseModel({title: request.body.title, 
            amount: request.body.amount,
            createdAt: Date.now(), 
            category: request.body.category, 
            description: request.body.description})
        await newExpense.save()
        return response.status(200).json(newExpense)
    } catch(error){
        return response.status(404).send(error)
    }
})

expensesRouter.patch("/:id", ObjectIdValidator, async (request: Request, response: Response) => {
    try{
        const expenseId = request.params.id
        const updateFields = request.body
        await ExpenseModel.findByIdAndUpdate(expenseId, updateFields, { new: true })
        response.status(200).send("The task has been successfully updated")
    } catch(error){
       response.status(404).send(error)
    }
})

expensesRouter.delete("/:id", ObjectIdValidator, async (request: Request, response: Response) => {
    try{
        const expenseId = request.params.id

        const result = await ExpenseModel.findByIdAndDelete(expenseId)
        
        if(result === null) {
            return response.status(404).send('Entity not found')
        }
        return response.status(200).send("Poprawnie usunięto zadanie")
    } catch (error) {
        return response.status(404).send(error)
    }
})

export {expensesRouter}