import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../AddExpensePage/AddExpensePage.css";

const AddExpense = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:3000/expense/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Expense created successfully");
        } else {
          console.log("Failed to create expense");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          required
          type="text"
          placeholder="Title"
          {...register("title")}
        />

        <input
          required
          type="text"
          placeholder="Category"
          {...register("category")}
        />

        <input
          required
          type="number"
          placeholder="Amount"
          {...register("amount", { valueAsNumber: true })}
        />

        <input
          required
          type="text"
          placeholder="Description"
          {...register("description")}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddExpense;
