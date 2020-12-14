import React,{useState} from 'react';

export default function SimpleForm(){
    const [state,setState] = useState({});
    const [showData,setShowData] = useState(false);
    const [error,setError] = useState({})

    const handleChange=(event)=>{
        delete error[event.target.name]
        setState({...state,[event.target.name]:event.target.value})
    }
    const formValidate=()=>{
        const err={}
        if(!state.name) err.name="Name is required";
        if(!state.address) err.address="Address is required";
        if(!state.mobileNumber) err.mobileNumber="mobile is required"; 
        return err;
    }
    const handleClick=(e)=>{
        e.preventDefault();
        const err= formValidate();
        if(Object.keys(err).length===0){
            setShowData(true)
        }
        else{
            setError(err)
        }
    }
    return(<div style={{margin:"200px 500px"}}>
        <form>
            <label htmlFor="name">Name</label>
            <input name="name" onBlur={handleClick} value={state.name||''} onChange={handleChange} id="name"/>
            <br />
            <span style={{color:"red"}}>{error.name}</span>
            <br />

            <label htmlFor="address">Address</label>
            <input name="address" onBlur={handleClick} value={state.address||''} onChange={handleChange} id="address"/>
            <br />
            <span  style={{color:"red"}}>{error.address}</span>
            <br />

            <label htmlFor="mobileNumber">Mobile Number</label>
            <input name="mobileNumber" onBlur={handleClick} value={state.mobileNumber||''} onChange={handleChange} id="mobileNumber"/>
            <br />
            <span  style={{color:"red"}}>{error.mobileNumber}</span>
            <br />

            <button onClick={handleClick} > Submit</button>
        </form>
        {showData&&<div>
            Name:{state.name}
            <br />
            Address:{state.address}
            <br />
            Mobile Number:{state.mobileNumber}
        </div>}

    </div>)
}

