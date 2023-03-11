
import React, { useEffect,useState } from 'react'
import{API} from '../../../src/service/api';
import { Box ,Grid} from '@mui/material';
//import Post from './Post';
import { useSearchParams,Link } from 'react-router-dom';

export default function Post() {

    const[post,setPost]=useState([{}]);
    
    const[searchParams]=useSearchParams();
    const category=searchParams.get('category');
    //console.log(category)

    useEffect(()=>{
        const fetchData=async()=>{
             let res=await API.getAllPosts();
             if(res.isSuccess){
                setPost(res.data)
             }
        }
        fetchData();
    },[])
    console.log(post[0].picture)

  return (
   <>
       {
          post && post.length>0 ? post.map(pos =>(
            <Grid item lg={3} sm={3} xs={12} key={pos._id} >
            {/* <Link  to={`post/${pos._id}`} style={{textDecoration:'none',color:'inherit'}}>
            <Post post={pos}/>
           
            </Link> */}
             <video width="520" height="340" controls>
            <source src={pos.picture} type="video/mp4"/>
 
              </video>
            </Grid>
           
          )): <Box style={{color:'#878787', margin:'30px 80px',fontSize:18}}>No data to display! </Box>
       }
    
    </>
  )
}
