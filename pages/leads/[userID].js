import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import api from "../../lib/api";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function SimpleTable( { initData, webhookPath, total, userID }) {
  const classes = useStyles();
    
  const otherColumns = useMemo(() => {
    const result = {};
    initData.forEach(e => {
      Object.keys(e.Others).forEach(e2 => {
        result[e2] = 1;
      });
    });
    return Object.keys(result);
  }, [ initData ]);
  
  
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(initData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    refetchData(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
    refetchData(0);
  };

  const refetchData = async (page) => {
    const offset = page * size;
    const { data } = await getLeadData(userID, offset, size);
    setData(data);
  }

  return (
    <div style={{margin: "100px"}}>
      <form style={{textAlign: "center", marginBottom: "50px"}}>
        <h3>Your Webhook URL</h3>
        <TextField
          style={{width: "45%", textAlign: "center"}}
          id="filled-read-only-input"
          defaultValue={`${process.env.serverURL}${webhookPath}`}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
          variant="filled"
        />
      </form>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              {otherColumns.map((col) => (
                <TableCell key={col} align="right">{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.ID}>
                <TableCell>{row.ID}</TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">{row.Phone}</TableCell>
                {otherColumns.map((col) => (
                  <TableCell align="right">{row.Others[col] || "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={size}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { userID } = ctx.params
  const { data, total } = await getLeadData(userID, 0, 10);
  const { data: webhookPath } = await api.get(`/user/${userID}/webhook`);
  return { props: { initData: data, webhookPath, total, userID }}
}

async function getLeadData(userID, offset, limit) {
  const { data: { Data: data, Total: total } } = await api.get("/lead", {
    params: { userID, offset, limit }
  });
  return { data, total };
}

export default SimpleTable;