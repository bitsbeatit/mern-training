import React,{useState} from 'react';

export default function DynamicForm(){
    const [state,setState] = useState({});
    const [showData,setShowData] = useState(false);

    const handleChange=(event)=>{
        if(event.target.name==="isAddress"){
            setState({...state,isAddress:!state.isAddress})
        }
        else{
            setState({...state,[event.target.name]:event.target.value})
        }
    }
    const handleClick=(e)=>{
        e.preventDefault();
        setShowData(true)
    }
    const addMore=()=>{

    }
    return(<div style={{margin:"200px 500px"}}>
        <form>
            
            <label htmlFor="name">Name</label>
            <input name="name" value={state.name||''} onChange={handleChange} id="name"/>
            <br />
            <label htmlFor="isAddress">Address required?</label>
            <input id="isAddress" type="checkbox" name="isAddress" checked={state.isAddress} onChange={handleChange}/>
            <br />
            {state.isAddress &&
            <div>
            <label htmlFor="address">Address</label>
            <input name="address" value={state.address||''} onChange={handleChange} id="address"/>
            </div>
            }
            <br />
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input name="mobileNumber" value={state.mobileNumber||''} onChange={handleChange} id="mobileNumber"/>
            <button onClick={handleClick} > Submit</button>
        </form>
        {/* <button onClick={addMore} >Add More</button> */}
        {showData&&<div>
            Name:{state.name}
            <br />
            Address:{state.address}
            <br />
            Mobile Number:{state.mobileNumber}
        </div>}

    </div>)
}

