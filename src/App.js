import './App.css';
import { Link, Route, Switch, useHistory, useParams} from "react-router-dom";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  return (
   <div>
   <ul>
     <li>
       <Link to = "/">Home</Link>
     </li>
     <li>
       <Link to = "/add">Add</Link>
     </li>
   </ul>

   <Switch>
        <Route exact path = "/">
          <Display />
        </Route>
        <Route path = "/add">
          <AddUser />
        </Route>
        <Route path = "/editUser/:id">
          <EditUser />
        </Route>
        <Route path = "/delete">
          <EditUser />
        </Route>
   </Switch>
   </div>
  );
}

function Display() {

const[apiResult, setApiResult] = useState([]);
const history = useHistory();

useEffect(() => {
  console.log("inside Display useEffect")
  fetch('https://6191a91141928b00176900f1.mockapi.io/users')
  .then(data => data.json())
  .then(result => {
    setApiResult(result);
  console.log(result)
})
}, [])

const deleteData = (id) => {
  fetch('https://6191a91141928b00176900f1.mockapi.io/users/'+id,
  {
    method : 'DELETE'
  })
  .then(result => result.json())
  .then(data => {
    console.log(data)
    getApi()
  })
}

const getApi = () => {
  fetch('https://6191a91141928b00176900f1.mockapi.io/users')
  .then(data => data.json())
  .then(result => {
    setApiResult(result);
  console.log(result)
})
}
 return(
  <div>
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
      </thead>
      <tbody>
        {apiResult.map((e,index) => {
          return <tr key = {index}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phoneNo}</td>
                    <td>
                      <Button variant="contained" color="success" onClick = {() => history.push("/editUser/"+e.id)}>edit</Button>
                      <Button variant="outlined" color="error" onClick = {() => {deleteData(e.id)}}>delete</Button>
                    </td>
                 </tr>
        })}
      </tbody>
    </table>
  </div>
 );  
}

function AddUser() {

  const [name, setName] =  useState('');
  const [email, setEmail] =  useState('');
  const [phoneNo, setPhoneNo] = useState('');
  let data = { name,email,phoneNo }
 const addData = () =>{
  fetch('https://6191a91141928b00176900f1.mockapi.io/users/',
  {
   method : 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(data)
   })
  .then(data => data.json())
  .then(result => 
   {
     console.log("update result" + JSON.stringify(result))
     
   })
 }
 return(
  <div>
     <TextField id="outlined-required" label="name" type = "text" onChange = {(e)=>{setName(e.target.value)}}/>
     <TextField id="outlined-required" label="email" type = "text" onChange = {(e)=>{setName(e.target.value)}}/>
     <TextField id="outlined-required" label="phoneNo" type = "text"onChange = {(e)=>{setPhoneNo(e.target.value)}}/>
     
{/*      
    <input type = "text" onChange = {(e)=>{setName(e.target.value)}} placeholder = "name"></input>
    <input type = "text" onChange = {(e)=>{setEmail(e.target.value)}} placeholder = "email"></input>
    <input type = "text" onChange = {(e)=>{setPhoneNo(e.target.value)}} placeholder = "phoneNo"></input> */}
    <br /><br />
    <Button  variant="contained" color="success" type = "submit" onClick = {addData}>submit</Button>
    
  </div>
 ); 
}

function EditUser() {
  
  const history = useHistory();
    
  let {id} = useParams()
  const [name, setName] =  useState('');
  const [email, setEmail] =  useState('');
  const [phoneNo, setPhoneNo] = useState('');
 const[apiResult, setApiResult] = useState({});
 
 useEffect(()=>{
  console.log(id);
  if(id !== '') {
  fetch('https://6191a91141928b00176900f1.mockapi.io/users/'+id)
  .then(data => data.json())
  .then(result => setApiResult(result));
  }
 },[])
 
 useEffect(() => {
  
  setName(apiResult.name);
  setEmail(apiResult.email);
  setPhoneNo(apiResult.phoneNo);
 },[apiResult])
 //const [id_, setId] = useState(apiResult.id);


 const data = {id, name, email, phoneNo}
 console.log(data)

 const update = () => {
   fetch('https://6191a91141928b00176900f1.mockapi.io/users/'+id,
   {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
    })
   .then(data => data.json())
   .then(result => 
    {
      console.log("update result" + JSON.stringify(result))
      
    })
 }

 return(
  <div>
    {JSON.stringify(apiResult)}
    <input value = {name} type = "text" onChange = {(e)=>{setName(e.target.value)}}></input>
    <input value = {email} type = "text" onChange = {(e)=>{setEmail(e.target.value)}}></input>
    <input value = {phoneNo} type = "text" onChange = {(e)=>{setPhoneNo(e.target.value)}}></input>
    <input type = "submit" onClick = {update}></input>
  </div>
 ); 
}




export default App;
