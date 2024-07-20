import React, { useEffect } from 'react'

import { Outlet, useLocation, useNavigate  } from "react-router-dom";
import Sider from '../../layout/sider';
import Navbar from '../../layout/navbar';
import SubNavbar from '../../layout/subNavbar';
////styles
import "./styles.scss"
import Footer from '../../layout/footer';
import { useMediaQuery } from '../../useMediaQuery';
import { useEventGameMutation } from '../../services/sport/matchList';
import Blink from '../../components/blink/Blink';
const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width:780px)") 
   const [trigger,{data,isLoading}]= useEventGameMutation()
  const inplayMatches = data?.data?.InplayMatches || [];
  const {pathname} = useLocation()
  useEffect(() => {
    trigger({limit: 50, pageno: 1, sport_id: String(4), series_id: 0, type: "home"})
  }, [])
  const subNavbarCheck = isMobile && pathname.split("/")[1] == "game-detail"
  const checkUrl = window.location.pathname
  const nav = useNavigate()
  useEffect(() => {
    const localStorageTOken = localStorage.getItem("token")
   if(!localStorageTOken){
    nav("/login")
   }
  }, [])
  return (
    <div className='main-layout'>
      <div className="layout-nav-col">
        <Navbar/>
        {isMobile &&
    <div className={`w-full grid grid-cols-${inplayMatches?.length} gap-1`}>
      {inplayMatches?.map((item)=>{
        return(
          
          <Blink key={item?.series_id} data={item}/>
        )
      })}
   
    </div>
    }
    {subNavbarCheck || checkUrl.split("/")[1] =="casino-lobby" || checkUrl.split("/")[1] =="aviator-lobby"  ?
       null :<SubNavbar/>
    }
      </div>
      <div className="main-layout-col mt-[.3125rem] mr-[.3125rem]">

      <div className="main-layout-sider">
        <Sider/>
      </div>
      <div className="main-layout-content">
      <Outlet/>
      </div>
      </div>
      <Footer/>
      </div>
  )
}

export default MainLayout