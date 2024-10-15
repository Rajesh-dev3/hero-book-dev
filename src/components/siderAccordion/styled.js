import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import { fontWeight, margin, padding } from "@mui/system";
export const CustomAccordion = styled(Accordion)(({ theme }) => {
    return {
      boxShadow: "none", // this styles directly apply to accordion
      ".MuiAccordionDetails-root": {
        backgroundColor:"#bbbbbb",
        
      },
      
  
      

      ".MuiAccordionSummary-root": {
        height: "30px",
        minHeight: "30px !important",
        backgroundColor: "#0088CC",
        color: "white",
        margin: "0px 0 !important",
        padding:"0 9px !important",
        fontSize:"16px",
      }, // this apply to Summary
      "&.Mui-expanded":{
        margin: "0px 0 !important",
      },
     
   
    };
  });
