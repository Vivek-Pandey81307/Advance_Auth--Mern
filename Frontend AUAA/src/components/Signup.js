import { Box,TextField,Button,Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
    const history = useNavigate();
    const [inputs,setInputs] =useState({name : "",email:"",password:""})
    const handleChange =(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const sendRequest = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/signup', {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.error('Error occurred while sending request:', error);
            throw error; // Rethrow the error to be caught by the caller
        }
    }
       
    const handleSubmit=(e)=>{
        e.preventDefault();
        sendRequest().then(()=>history("/login"));
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <Box marginLeft={"auto"} marginRight={"auto"} width={300} display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={'center'}>
            <Typography   variant='h5'>Signup</Typography>
            <TextField onChange={handleChange} name="name" value={inputs.name} varaint="outlined" placeholder="Name" margin="normal"/>
            <TextField onChange={handleChange} name="email" type='email' value={inputs.email}varaint="outlined" placeholder="Email" margin="normal"/>
            <TextField onChange={handleChange} name="password" type="password" value={inputs.password} variant="outlined" placeholder="Password" margin="normal" />
            <Button variant="contained" type="submit">Signup</Button>
        </Box>
    </form>
    </div>
  )
}

export default Signup