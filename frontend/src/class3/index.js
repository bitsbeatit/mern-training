import React,{useState} from 'react'
import request from './services/request';

export default function SimpleLoginForm(){
    const [data,setData] = useState({})
    const handleChange=(e)=>{
        console.log(e.target.name,e.target.value)
        setData({...data,[e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        const datas = await request("http://localhost:3333/list",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item:"hello" })
        });
        console.log("submit data",datas)
    }
    return(
        <div style={{margin:"200px 500px",maxWidth:"800px",padding:"50px",background:"gray"}}>
            <h1>Login</h1>
    <form> 
        <label htmlFor="username" >User Name </label>
        <input type="text" name="username" value={data.username||''} id="username" onChange={handleChange}/>
        <br />
        <label htmlFor="username" >Password </label>
        <input type="text" name="password" value={data.password||''} id="password" onChange={handleChange}/>
        <br />
        <label htmlFor="username" >Password </label>
        <input type="checkbox" name="password" value={data.password||''} id="password" onChange={handleChange}/>
        <br />
        <button style={{cursor:"pointer"}} onClick={e=>handleSubmit(e)}>Submit</button>
    </form>
    </div>)
}