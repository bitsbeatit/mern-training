import React,{useState,useEffect} from 'react';
import request from '../services/request';
import HooksExample from "./lifecycleHookExample";

export default function FetchApiExample(props){
    const [state,setState] = useState({});
    const [postList,setPostList] = useState([]);
    const [showSuccessMessage,setShowSuccessMessage] = useState(false);
    const [isSelected,setIsSelected] = useState(false);

    const [error,setError] = useState({})

    const handleChange=(event)=>{
        delete error[event.target.name]
        setState({...state,[event.target.name]:event.target.value})
    }
    const formValidate=()=>{
        const err={}
        if(!state.title) err.title="Title is required";
        if(!state.body) err.body="Body is required";
        return err;
    }
        async function addPost(e){
        e.preventDefault();
        const err= formValidate();
        if(Object.keys(err).length===0){
            const datas = await request("https://jsonplaceholder.typicode.com/posts",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });
            if(datas){
                setIsSelected(false);
                setState({});
                setShowSuccessMessage(true)
                setTimeout(()=>setShowSuccessMessage(false),3000)
            }
        }
        else{
            setError(err)
        }
        }
        async function getPosts(e){
            e.preventDefault();
                const datas = await request("https://jsonplaceholder.typicode.com/posts",{
                    method: 'GET',
                });
                console.log(datas)
                setPostList(datas)
         }

         async function updatePost(e){
            e.preventDefault();
            const err= formValidate();
            if(Object.keys(err).length===0){
                const datas = await request(`https://jsonplaceholder.typicode.com/posts/${state.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(state)
                });

                if(datas){
                    setIsSelected(false);
                    setState({});
                    setShowSuccessMessage(true)
                }
            }
            else{
                setError(err)
            }
            }
            const selectPost=(e,selectedPost)=>{
                e.preventDefault()
                setPostList([])
                setIsSelected(true);
                setState(selectedPost);
            }

    return(<div style={{margin:"200px 500px"}}>
        <form>
            {showSuccessMessage&& <span style={{color:"green"}}>Success</span> }
            <br />
            <label htmlFor="title">Title</label>
            <br />
            <input name="title" value={state.title||''} onChange={handleChange} id="title"/>
            <br />
            <span style={{color:"red"}}>{error.title}</span>
            <br />

            <label htmlFor="address">Body</label>
            <textarea  rows="4" cols="50"  name="body" value={state.body||''} onChange={handleChange} id="body"/>
            <br />
            <span  style={{color:"red"}}>{error.body}</span>
            <br />
            {isSelected?<button onClick={updatePost} > Update Post</button>:<button onClick={addPost} > Add Post</button>}

        </form>
        <button onClick={getPosts}>Get Post</button>
        <ul>
        {postList && postList.length>0 && postList.map((each,index)=>
        <li key={each.id}>
            <p>ID:{each.id}</p>
            <p>Title:{each.title}</p>
            <p>Body:{each.body}</p>
            <button onClick={(e)=>selectPost(e,each)}>Select</button>
        </li>)}
        </ul>
        <HooksExample name={state.title} address="test" />
    </div>)
}

