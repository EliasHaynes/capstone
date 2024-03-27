import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StickyHeadTable({
  repairs,
  dateStamp,
  total,
  navigate,
  handleDelete,
  currentVId,
  userId,
  reRenderPage
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "id", label: "ID", minWidth: 25 },
    {
      id: "date",
      label: "Date",
      minWidth: 25,
      format: new Date(dateStamp).toLocaleDateString("en-US"),
    },
    {
      id: "repair_mileage",
      label: "Repair_Mileage",
      minWidth: 50,
    },
    {
      id: "maintenance",
      label: "Maintenance Description",
      minWidth: 100,
      align: "left",
    },
    {
      id: "performed_by",
      label: "Performed By",
      minWidth: 50,
      align: "center",
    },
    {
      id: "material",
      label: "Material $",
      minWidth: 50,
      align: "right",
    },
    {
      id: "labor",
      label: "Labor $",
      minWidth: 50,
      align: "right",
    },
    {
      id: "other",
      label: "Other $",
      minWidth: 50,
      align: "right",
    },
    {
      id: "total",
      label: "Total",
      minWidth: 50,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "left",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.repair_id}
                  >
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === "date") {
                        value = new Date(value).toLocaleDateString("en-US");
                      } else if (column.id === "total") {
                        value = `$${Math.round(row.material + row.labor + row.other)}`
;                        
                        // Calculation for total, same as before
                      } else if (column.id === "actions") {
                        // Render action icons
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <EditIcon
                              onClick={() =>
                                navigate(
                                  `/update/${userId}/${currentVId}/${row.repair_id}`
                                )
                              }
                            />
                            <DeleteIcon
                              onClick={() => {
                                console.log("The ID:", row.repair_id)
                                  handleDelete(row.repair_id);
                                  reRenderPage()                          }}
                              className="icon text-red"
                            />
                          </TableCell>
                        );
                      } else if (column.id === "id") {
                        value = index +1
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={repairs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
