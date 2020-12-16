import React,{useEffect} from 'react';

const HooksExample=({name,address})=>{

    useEffect(()=>{
        console.log("mounted")
       return()=>{
            console.log("unmounted")
        }
    },[])
    useEffect(()=>{
        console.log("props changed")
    },[name])
    return(
    <div>
        name:{name}
        address:{address}
    </div>)
}

export default HooksExample