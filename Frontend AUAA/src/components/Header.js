import React,{useState} from "react";
import { Link,AppBar,Box, Typography, Toolbar, Tabs,Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
const Header = () => {
    const [value,setValue] =useState(0)
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h2">MernAuth</Typography>
          <Box sx={{marginLeft:"auto"}}>
        <Tabs indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} textColor = "inherit">
          <Tab to="/login" LinkComponent={NavLink} label="Login" />
          <Tab to="/signup" LinkComponent={NavLink} label="Signup"/>
        </Tabs>
      </Box>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default Header;
