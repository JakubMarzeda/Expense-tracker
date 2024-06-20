import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchData = useCallback(() => {
    fetch("http://localhost:3000/expense/")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:3000/expense/${id}/`, {
      method: "DELETE",
    })
      .then(() => fetchData())
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledDeleteAction = styled("span")({
    color: red[500],
    cursor: "pointer",
  });

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Title",
      width: 130,
      valueFormatter: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
      valueFormatter: (value) => value + " zł",
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      valueFormatter: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 130,
      valueFormatter: (value) => dayjs(value).format("DD.MM.YYYY"),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      valueFormatter: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<StyledDeleteAction>Delete</StyledDeleteAction>}
            label="Delete"
            onClick={() => handleDeleteExpense(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={expenses}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        checkboxSelection
      />
    </Container>
  );
};

const Container = styled("div")({
  height: 370,
  width: "100%",
});


export default Expenses;