import { MenuItem , styled } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)({
  "&.MuiMenuItem-root": {
    color: "black",
    padding: "0.6rem 1.8rem 0rem 0.5rem",
    fontSize:"15px",
    minHeight:"20px",
    "&.Mui-selected": {
    //   backgroundColor: "red"
    },
    "&:hover": {
    textDecoration:"underline",
    //   backgroundColor: "green"
    }
  }
});