import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import { Container, Row, Col } from "react-bootstrap";


const App = () => {

const [data, setData] = useState({
  id: null,
  name: "",
  description: "",
  deadline: "",
  btnId: null,
  checked: false
})
const [status, setStatus] = useState([])
const [allData, setAllData] = useState([])

const onChangeHandler = (event)=>{
  const {name, value} = event.target
  setData( prev => ({ ...prev, [name]: value}))
}

const submitHandler = (event)=>{
  
  event.preventDefault()
  if(data.btnId){
    const editedData = status.map((item) => item.id === data.btnId ? data : item)
    setAllData([...editedData])
    setStatus([...editedData])
  }else{
    const uuid = uuidv4()
    setAllData([...allData,{...data, id:uuid}]) 
    setStatus([...status, {...data, id:uuid}])
  }
  setData({
    id: null,
    name: "",
    description: "",
    deadline: "",
    checked: false,
    btnId: null
  })
}

const deleteItem = (id)=>{
  const deleteData = [...status].filter((item)=> id !== item.id)
  setAllData([...deleteData])
  setStatus([...deleteData])
}

const editItem = (id)=>{
  const editData = status.find((item)=> item.id === id)
  setData({...editData, btnId:id})
}

const checkMark = (id)=>{
  const checkedData = allData.filter((item)=>{
    if(item.id === id){
      item.checked = item.checked ? false : true
    }
    return item
  })
  setAllData([...checkedData]);
  setStatus([...checkedData]);
}

const filterDataByStatus = (string)=>{
  let filterData = [...status]
  if(string === "done"){
    filterData = filterData.filter(({checked})=> checked)
  }else if(string === "inprogress"){
    filterData = filterData.filter(({checked})=> !checked )
  }
  setAllData([...filterData])
}

  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center mt-5"> Test Task </h1>
          <Col xs lg="3"></Col>
          <Col xs lg="7">
            <form action="" onSubmit={submitHandler}>
            <label htmlFor="name">name:</label>
              <input
                type="text"
                name="name"
                placeholder="add task"
                className="form-control"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
              <br/>
              <label htmlFor="description">description:</label>
              <input
                type="text"
                name="description"
                placeholder="add description"
                className="form-control"
                value={data.description}
                onChange={onChangeHandler}
              />
              <br/>
              <label htmlFor="deadline">deadline:</label>
              <input
                type="date"
                name="deadline"
                className="form-control"
                value={data.deadline}
                onChange={onChangeHandler}
              />
              <br/>
              <button
                type="submit"
                className="btn btn-primary mt-2"
              >{ data.btnId ? <span>Edit Task</span>  : <span>ADD TASK</span>}</button>
            </form>
          </Col>
        </Row>
        <hr/>
        <div> <button onClick={()=>filterDataByStatus("all")}>All</button> 
        <button onClick={()=>filterDataByStatus("inprogress")}>In-progress</button>  
         <button onClick={() => filterDataByStatus('done')}>Done</button></div>
        {allData? allData.map( (item) => (
            <ul key={item.id}>
              <li><strong>Name:</strong> {item.name} <strong>Description:</strong> 
                {item.description} <strong>Deadline:</strong> {item.deadline}
                <input type="checkbox" name="checked"  value={item.checked} onChange={()=>checkMark(item.id)}/>
                <button onClick={()=>deleteItem(item.id)}>Delete</button>
                <button onClick={()=>editItem(item.id)}>Edit</button>
              </li> 
            </ul>
          ))
        :null}
      </Container>
    </>
  )
}

export default App