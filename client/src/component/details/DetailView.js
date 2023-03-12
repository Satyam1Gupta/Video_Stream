
import React,{useState,useEffect,useContext} from 'react'
import { Box,Typography,styled,Grid }from '@mui/material'
import{useParams,Link, Navigate,useNavigate} from 'react-router-dom'
import { API } from '../../service/api';
import{Edit,Delete} from '@mui/icons-material'
import {DataContext} from '../../context/DataProvider'
import Comments from './comments/Comments.js';


const Container=styled(Box)(({theme})=>({
  paddingLeft:'60px',
  margin:'25px 100px 0 0px',
  [theme.breakpoints.down('sm')]:{
    margin: 0,
    padding:20
  }
}));

const Video=styled('video')({
    width: '100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:'400px'
})
const Text=styled(Box)`
color:#878787;
margin:20px 0;
display:flex;

`;
const Heading=styled(Typography)`
font-weight:550;
font-size:25px;
text-align:center;
margin:0px 0 20px 0;
word-break:break-word;`;
const Desc=styled(Typography)`
fornt-size:14px;
word-break:break-word;
`;
const EditIcon=styled(Edit)`

margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`;
const DeleteIcon=styled(Delete)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`;

export default function DetailView() {

  const username=sessionStorage.getItem('userName');
    const {id}=useParams();
    const[post,setPost]=useState({});
    const{acount}=useContext(DataContext);
    const navigate=useNavigate()
    
    useEffect(()=>{
        const fetchData=async()=>{
          const res=await API.getPostById(id);
          if(res.isSuccess){
            setPost(res.data)
          }
        }
        fetchData();
    },[])
   
   const deleteBlog=async()=>{
    let res=await API.deletePost(post._id);
    if(res.isSuccess){
      navigate('/')
    }
   }
   console.log(post.picture)
     const url= post.picture?post.picture:"http://localhost:8000/file/1678515671721-blog-1674996661860.mp4";
    return (
     <>
     <Grid container>
     
     <Grid item lg={8} sm={10} xs={12}>
       <Container>
      
         <Video controls>
                <source src={url} type="video/mp4"/>
            </Video>
            <Heading>{post.title}</Heading>
         {
            username===post.username &&
             <Box sx={{float:'right'}}>
               {/* <Link to={`/update/${post._id}`}> <EditIcon color='primary' fontSize="large"/></Link> */}
                {/* <DeleteIcon fontSize="large" onClick={()=>deleteBlog()} color='error' /> */}
             </Box>
         }
         
         <Text style={{marginTop:'30px'}}>
            <Typography>Creator:<Box component='span' style={{fontWeight:600}}>{post.username}</Box></Typography>
            <Typography style={{marginLeft:'auto'}}>{new Date(post.createDate).toDateString()}</Typography>
         </Text>
          {/* <Desc>{post.description}</Desc> */}
          <Comments post={post}/>
      </Container>
     </Grid>
        <Grid item lg={4} sm={2} xs={12}>
        <h1>Recommendation</h1>
        </Grid>
      </Grid>
     </>
    )
}
