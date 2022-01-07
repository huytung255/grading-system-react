import React from "react";
import { MTableCell } from "@material-table/core";
import CellMenu from "./CellMenu";
import { Typography, TableCell } from "@mui/material";
const CustomCell = ({ fetchRowsOnly, ...props }) => {
  const { field } = props.columnDef;
  const { name } = props.rowData;

  if (field === "studentId" || field === "name" || field === "average")
    return <MTableCell {...props} />;
  else if (name === "Class average")
    return (
      <TableCell className="column-average">
        <Typography component="span">{props.rowData[field]}</Typography>
      </TableCell>
    );
  else {
    const { studentsClassesId } = props.rowData;
    const { gradeStructureId } = props.columnDef;

    if (props.rowData[field + "Status"] === "Reviewed") {
      return (
        <TableCell className="column-average">
          <Typography
            className="cell-status"
            component="span"
            sx={{
              color: statusColor(props.rowData[field + "Status"]),
              fontSize: 13,
              textAlign: "left",
            }}
          >
            {props.rowData[field + "Status"]}
          </Typography>
          <Typography component="span">{props.rowData[field]}</Typography>
        </TableCell>
      );
    }
    return (
      <MTableCell {...props} className="custom-cell">
        <>
          <div className="cell-menu-wrapper">
            <CellMenu
              field={field}
              studentsClassesId={studentsClassesId}
              gradeStructureId={gradeStructureId}
              status={props.rowData[field + "Status"]}
              fetchRowsOnly={fetchRowsOnly}
            />
          </div>
          <Typography
            className="cell-status"
            component="span"
            sx={{
              color: statusColor(props.rowData[field + "Status"]),
              fontSize: 13,
              textAlign: "left",
            }}
          >
            {props.rowData[field + "Status"]}
            {props.rowData[field + "Status"] === "Drafted" &&
              props.rowData[field + "Finalized"] && (
                <Typography
                  sx={{
                    fontSize: 11,
                  }}
                >
                  Finalized: {props.rowData[field + "Finalized"]}
                </Typography>
              )}
          </Typography>
        </>
      </MTableCell>
    );
  }
};
const statusColor = (status) => {
  switch (status) {
    case "Drafted":
      return "primary.main";
    case "New":
      return "text.secondary";
    case "Finalized":
      return "success.dark";
    case "Reviewed":
      return "warning.dark";
    default:
      return "text.secondary";
  }
};
export default CustomCell;
