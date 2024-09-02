import  { useEffect, useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ClearIcon from "@mui/icons-material/Clear"; // Import the clear icon

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
const [Exposure, setExposure] = useState({
  balance:true,
  exposure:true
})
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
    {!Exposure?.balance?"":
    <div className="balance-user">Balance<span>{data?.data?.balance}</span></div>
    }
   <div className="user-info">
    {!Exposure?.exposure
    ?"":
    <div className="exp">
      Exp: <span>{data?.data?.liability}</span>
    </div>
    }
    <div className="user-detail">
    <NavDropDown setExposure={setExposure} exposure={Exposure}/>
    </div>

   </div>
  </div>
  
</div>
{!isMobile &&
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
}

<div className="ss flex">
  {isMobile
  &&
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
  }

<div className="news">
          <Marquee speed={50}>
        {data?.data?.site_message}</Marquee></div>
</div>
        
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
            <span>Download Apk <i className="fab fa-android"></i></span>
          </li>
          <li>
            <span > <span>
              Balance
              </span>
              <span  className="bold-b">
              :{data?.data?.balance || 0}

              </span>
              </span>
            <span >
              <span>
              Exp
              </span>
              <span className="bold-b">

              :{data?.data?.liability||0}
              </span>
              </span>
          </li>
          <li>
        <NavDropDown setExposure={setExposure} exposure={Exposure}/>
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
