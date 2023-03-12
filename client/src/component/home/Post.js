
import React, { useEffect,useState } from 'react'
import{API} from '../../../src/service/api';
import { Box ,Grid} from '@mui/material';
import { Typography,styled } from '@mui/material'
import Post_1 from './Post_1';
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
     <Box style={{margin:30}}>
      {/* <h1 style={{justifyContent:'center'}}>Videos</h1> */}
     <Grid container>
       {
          post && post.length>0 ? post.map(pos =>(
          
                <Grid item lg={3} sm={3} xs={12} key={pos._id} >
                <Link  to={`post/${pos._id}`} style={{textDecoration:'none',color:'inherit'}}>
                  <Post_1 post={pos}/>
                </Link>
                
                </Grid>
          
           
          )): <Box style={{color:'#878787', margin:'30px 80px',fontSize:18}}>No data to display! </Box>
       }
      </Grid>
     </Box>
    </>
  )
}
