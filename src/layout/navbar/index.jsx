import  { useEffect, useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ClearIcon from "@mui/icons-material/Clear"; // Import the clear icon
import MenuItem from '@mui/material/MenuItem';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import Select from '@mui/material/Select';
import { useMediaQuery } from "../../useMediaQuery";


import { logo } from "../../assets"
////styles
import "./styles.scss"
import NavDropDown from "./NavDropDown";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useWalletBalanceMutation } from "../../services/walletBalance/WalletBalance";
const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false)

  // Function to clear the search input
  const clearSearch = () => {
    setSearchValue("");
  };

  const [trigger,{data}]= useWalletBalanceMutation()
useEffect(() => {
  trigger()
}, [])
const isMobile = useMediaQuery("(max-width:780px)")
  return (
    <>
    {isMobile?<div className="mobile-navbar">
<div className="navbar">
  <div className="logo-nav">
    <Link to={"/"}>
    <span><HomeRoundedIcon /></span>
    <span className="mobile-nav-logo"><img src={logo} alt="" /></span>
    </Link>
  </div>
  <div className="balance-nav">
    <div className="blance-user">Balance<span>{data?.data?.balance}</span></div>
   <div className="user-info">
    <div className="exp">
      Exp: <span>{data?.data?.liability}</span>
    </div>
    <div className="user-detail">
    <NavDropDown/>
    </div>

   </div>
  </div>
  
</div>
<div className="search-bar">
          <input
          className={openSearch?"open-search":"close-search"}
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue &&
          <div className="cross-icon">

            <ClearIcon onClick={clearSearch} />
          </div> 
          }
          <div className="search-icon" onClick={()=>setOpenSearch(!openSearch)}>

          <ZoomInIcon />
          </div>
        </div>
        <div className="news"><Marquee speed={50}>
        {data?.data?.site_message}</Marquee></div>
    </div>
    :
    <div className="navbar-container">
      <div className="navbar-left-col">
        <Link to={"/"}>
        <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-right-col">
        <div className="search-bar">
          <input
          className={openSearch?"open-search":"close-search"}
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue &&
          <div className="cross-icon">

            <ClearIcon onClick={clearSearch} />
          </div> 
          }
          <div className="search-icon" onClick={()=>setOpenSearch(!openSearch)}>

          <ZoomInIcon />
          </div>
        </div>
        <ul className="list">
          <li>
            <span>Rule</span>
            <span>Download Apk</span>
          </li>
          <li>
            <span > <span className="bold-b">
              Balance
              </span>
              :{data?.data?.balance || 0}</span>
            <span >
              <span className="bold-b">

              Exp
              </span>
              :{data?.data?.liability||0}</span>
          </li>
          <li>
        <NavDropDown/>
          </li>
        </ul>
      </div>
      <div className="news"><Marquee speed={50}>
        {data?.data?.site_message}</Marquee></div>
    </div>
    }

    </>
  );
};

export default Navbar;
