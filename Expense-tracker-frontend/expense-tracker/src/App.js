import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataTable from "../src/pages/ExpensesPage/ExpensesPage"
import Expense from "../src/pages/ExpensePage/ExpensePage";
import AddExpense from "../src/pages/AddExpensePage/AddExpensePage";
import Raport from "../src/pages/RaportPage/RaportPage"
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataTable/>
  },
  {
    path: "/:id",
    element: <Expense/>
  },
  {
    path: "/add-expense",
    element: <AddExpense/>
  },
  {
    path: "/raport",
    element: <Raport />
  }
]);
function App() {
  return <RouterProvider router={router}/>
}

export default App;
