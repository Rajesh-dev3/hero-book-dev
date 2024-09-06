import { Select } from "@mui/material";

import styled from "styled-components";

export const CustomSelect = styled(Select)(({ theme }) => ({
    height: '38px',
    outline: 'none',
    borderRadius: '0',
    width: '60px',
    fontFamily: 'Roboto Condensed',
    paddingLeft: '0',
    paddingRight: '0',
    '& .MuiSelect-select': {
      paddingLeft: '4px', // Removes padding from the select input
    },
    '& .MuiSelect-icon': {
      padding: '2px', // Removes padding from the dropdown icon
    },
    '@media (max-width: 800px)': { // Custom breakpoint 2
        width: '50%',
        fontSize: '0.9rem',
        
    },
    '@media (max-width: 780px)': { // Custom breakpoint 1
    width: '120px',
  },
  }));