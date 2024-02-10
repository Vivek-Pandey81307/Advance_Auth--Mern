import { Box, Typography, TextField ,Button} from '@mui/material'
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const history = useNavigate();
  const [inputs,setInputs]=useState({email:"",password:""})
  const sendRequest =async()=>{
    try{
      const res =await axios.post('http://localhost:5000/api/login/',{
        email:inputs.email,
        password : inputs.password,
      })
      const data = await res.data;
      return data;
    }catch(error){
      console.error('Error occurred while sending request:', error);
      throw error;
    }
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    sendRequest().then(()=>history("/user"))
  }
  const handleChange=(e)=>{
    setInputs((prev)=>({...prev,[e.target.name]: e.target.value}))
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box marginLeft={"auto"} marginRight={"auto"} width={300} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
        <Typography  margin={"normal"}  variant='h5'>Login</Typography>
        <TextField  onChange={handleChange} name='email' value={inputs.email} type={'email'} variant='outlined' margin={"normal"} placeholder={"Email"}></TextField>
        <TextField onChange={handleChange}  name='password' value={inputs.password} type={'password'} variant='outlined' margin={"normal"}  placeholder={"Password"}></TextField>
        <Button margin={"normal"} variant='contained' type='submit'>Login</Button>
      </Box>
    </form> 
  )
}

export default Login