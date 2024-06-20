import type { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { isValidObjectId } from 'mongoose'
import { CreateExpenseValidationSchema } from "../models/expense"

export const createExpenseValidator = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const expense = new CreateExpenseValidationSchema()
        const { title, amount, category } = request.body;
        if (!title  || !amount || !category){
            throw new Error("Fill all data")
        }
    
        expense.title = title;
        expense.amount = amount;
        expense.createdAt = new Date();
        expense.category = category;
        expense.description = request.body.description;

        await validateOrReject(expense);
        
        next();
    } catch(error) {
        response.status(400).send(error)
    }
}

export const ObjectIdValidator = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id

    if(!id) {
      return response.status(400).send('Missing id')
    }
  
    if(!isValidObjectId(id)) {
     return response.status(400).send('Incorrect id')
    }
    return next()
}