import { useEffect, useState } from 'react'

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sider from '../../layout/sider';
import Navbar from '../../layout/navbar';
import SubNavbar from '../../layout/subNavbar';
import Footer from '../../layout/footer';
import { useMediaQuery } from '../../useMediaQuery';
import { useEventGameMutation } from '../../services/sport/matchList';
import Blink from '../../components/blink/Blink';
////styles
import "./styles.scss"
import { login } from '../../routes/PagesUrl';
import { useSelector } from 'react-redux';
import { useGetEventListMutation } from '../../services/sport/inPlayEvent';
const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width:780px)")
  const posts = useSelector(state => (state?.matchList?.mutations));

  const inplayData = Object.values(posts)
  const inplayMatches = inplayData[inplayData.length-1]?.data?.data?.InplayMatches || [];

  
  const nav = useNavigate()
  useEffect(() => {
    const localStorageTOken = localStorage.getItem("token")
    if (!localStorageTOken) {
      nav("/login")
    }
  }, [])



  
  const {pathname} = useLocation()
  const [trigge, { data: eventList }] = useGetEventListMutation()

  const urlList = ["/account-statement","/current-bet","/changepassword","/casino-results","live-casino-bet","/secure-auth"]
 
  const checkBlink =  urlList.includes(pathname)
  useEffect(() => {
    trigge({ "limit": 10, "pageno": 1, "sport_id": 0 })
  }, [])
  return (
    <div className='main-layout'>
      <div className="layout-nav-col">
        <Navbar />
        {!checkBlink && isMobile && pathname.split("/")[1] != "game-detail" &&
          <div className={`w-full flex overflow-scroll gap-1  latest-new`} style={{padding: "0 5px 5px"}}>
            {eventList?.data?.map((item) => {
              return (

                <Blink key={item?.series_id} data={item} />
              )
            })}

          </div>
        }
        {
          // pathname.split("/")[1] != "game-detail" &&
        <SubNavbar />
        }
 
      </div>
      <div className="main-layout-col mt-[.3125rem] mr-[.3125rem]">

        <div className="main-layout-sider">
          <Sider />
        </div>
        <div className="main-layout-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default MainLayout