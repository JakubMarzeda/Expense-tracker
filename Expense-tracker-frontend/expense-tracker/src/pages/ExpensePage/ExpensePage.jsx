import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const Expense = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/expense/${id}`)
      .then((response) => response.json())
      .then((data) => setExpense(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleDeleteExpense = () => {
    fetch(`http://localhost:3000/expense/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Deleted expense");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledDeleteAction = styled("span")({
    color: red[500],
    cursor: "pointer",
  });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
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
      getActions: () => {
        return [
          <GridActionsCellItem
            icon={<StyledDeleteAction>Delete</StyledDeleteAction>}
            label="Delete"
            onClick={handleDeleteExpense}
          />,
        ];
      },
    },
  ];

  return (
    <Container>
      {expense && (
        <DataGrid
          rows={[expense]}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
        />
      )}
    </Container>
  );
};

const Container = styled("div")({
  height: 160,
  width: "100%",
});

export default Expense;
