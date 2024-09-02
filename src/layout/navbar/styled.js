import { Padding } from "@mui/icons-material";
import { Checkbox, MenuItem , styled } from "@mui/material";
import { color, display, padding } from "@mui/system";
// import "../../styles/variables/mixins";

export const StyledMenuItem = styled(MenuItem)({
  "&.MuiMenuItem-root": {
    color: "black",
    padding: "0.6rem 1.8rem 0rem 0.5rem",
    fontSize:"15px",
    minHeight:"20px",
    
    "&.Mui-selected": {
      // backgroundColor: "red"
    },
    "&:hover": {
    textDecoration:"underline",
    //   backgroundColor: "green"
    },
    "&.custom-exposure-hide" : {
      display: "none",
  
      "@media (max-width: 768px)":{
        display: "flex",
        justifyContent: 'space-between',
        // padding:"none"
        // display:"flex",
        
      }
    },
    "&.Mui-checked":{
      Padding:"0px",
      color:"red",
    }
  
  }
});
export const StyledCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-root":{
    "&.Mui-checked":{
      Padding:"2px",
      color:"#2C3E50",
    }
  }
  }
);