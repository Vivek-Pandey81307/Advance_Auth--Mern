import React,{useState} from "react";
import { Link,AppBar,Box, Typography, Toolbar, Tabs,Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {authActions} from '../store/index'
axios.defaults.withCredentials=true;
const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const sendLogoutReq = async()=>{
      const res = await axios.post("http://localhost:5000/api/logout",null,{withCredentials:true})
      if(res.status==200){return res}
      return new Error("Unable to Logout,Please try again")
    }
    const handleLogout =()=>{
      sendLogoutReq().then(()=>dispatch(authActions.logout()))
    }
    const [value,setValue] =useState(0)
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h2">MernAuth</Typography>
          <Box sx={{marginLeft:"auto"}}>
        <Tabs indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} textColor = "inherit">
          {!isLoggedIn &&<Tab to="/login" LinkComponent={NavLink} label="Login" />}
         {!isLoggedIn && <Tab to="/signup" LinkComponent={NavLink} label="Signup"/> }
         {isLoggedIn && <Tab onClick={handleLogout} to="/" LinkComponent={NavLink} label="Logout"/> }
        </Tabs>
      </Box>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default Header;
