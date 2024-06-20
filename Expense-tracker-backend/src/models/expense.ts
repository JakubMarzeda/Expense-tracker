import mongoose from 'mongoose'
import { Length, IsNotEmpty, IsOptional, IsDate, IsBoolean, IsString, IsNumber } from 'class-validator'

interface IExpense{
    title: string
    amount: Number
    createdAt: Date
    category: string
    description? :string 
}

export class CreateExpenseValidationSchema implements IExpense{
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsNumber()
    amount!: Number;

    @IsDate()
    createdAt!: Date;

    @IsString()
    @IsNotEmpty()
    @Length(5, 25)
    category!: string;

    @IsString()
    description?: string;
}

export class UpdateExpenseValidationSchema extends CreateExpenseValidationSchema{
    @IsOptional()
    title!: string

    @IsString()
    @IsOptional()
    description?: string
}

export class ExpenseIdValidationSchema {
    @IsNotEmpty()
    id!: string
}

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const ExpenseModel = mongoose.model("Expense", ExpenseSchema)

export default ExpenseModel