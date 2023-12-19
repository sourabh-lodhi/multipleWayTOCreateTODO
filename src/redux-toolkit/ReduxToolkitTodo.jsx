import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./features/todoSlice";


import { Button, TextField , TableContainer, Table,
  TableHead, TableRow, TableBody, Paper,
  tableCellClasses,styled,TableCell
 } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
   backgroundColor: theme.palette.common.black,
   color: theme.palette.common.white,
 },
 [`&.${tableCellClasses.body}`]: {
   fontSize: 14,
 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 '&:nth-of-type(odd)': {
   backgroundColor: theme.palette.action.hover,
 },
 // hide last border
 '&:last-child td, &:last-child th': {
   border: 0,
 },
}));

const ReduxToolKit = () => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState({});
  const myState = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handlerChange = (event) => {
    setText(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (edit.id) {
      dispatch(editTodo({ id: edit.id, text }));
      setEdit({});
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };
  const deleteItem = (id) => {
    dispatch(deleteTodo(id));
  };
  const EditItem = (id) => {
    const findItem = myState.todo.find((item) => item.id === id);
    setEdit(findItem);
    setText(findItem.text);
  };
  return (
    <div style={{textAlign: "center"}}>
     <h1>Todo With Redux</h1>
     <form noValidate autoComplete="off" onSubmit={submitHandler}>
     <TextField id="outlined-basic" label="add todo" variant="standard" name="text" value={text} onChange={handlerChange}/><br/>
     <Button style={{margin: "20px"}} variant="contained" type="submit">{edit.id ? "EDIT_TODO" : "ADD TODO"}</Button><br/>
     </form>
    {myState.todo.length >0 ?<TableContainer sx= {{ width: "60%", alignContent: "center", margin: "auto"}} component={Paper}>
      <Table sx={{ minWidth: 70 }} aria-label="customized table">
        <TableHead>
          <TableRow>  
            <StyledTableCell component="th" scope="row">SNO.</StyledTableCell>
            <StyledTableCell align="right">Task</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {myState.todo.map((row,index) => {
          return <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
              <StyledTableCell align="right">{row.text}</StyledTableCell>
              <StyledTableCell align="right">
              <Button  variant="contained" sx={{marginRight:"5px"}} onClick={() => EditItem(row.id)}>Edit</Button>
              <Button sx={{backgroundColor:'red'}} variant="contained" onClick={() => deleteItem(row.id)}>Delete</Button></StyledTableCell>
            </StyledTableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>:""}
    </div>
  );

};
export default ReduxToolKit;
