import React,{useState} from "react";
import { AppBar,Box, Typography, Toolbar, Tabs,Tab } from "@mui/material";
import App from "../App";
const Header = () => {
    const [value,setValue] =useState()
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h2">MernAuth</Typography>
          <Box sx={{marginLeft:"auto"}}>
        <Tabs indicatorColor="secondary" value={value} onChange={(e,val)=>{setValue(val);console.log(val)}} textColor = "inherit">
          <Tab label="Login" />
          <Tab label="Signup"/>
        </Tabs>
      </Box>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default Header;
