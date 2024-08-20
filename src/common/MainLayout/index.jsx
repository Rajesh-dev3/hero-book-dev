import  { useEffect, useState } from 'react'

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
const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width:780px)")
  const [trigger, { data }] = useEventGameMutation()
  const inplayMatches = data?.data?.InplayMatches || [];
  const { pathname } = useLocation()
  useEffect(() => {
    trigger({ limit: 50, pageno: 1, sport_id: String(4), series_id: 0, type: "home" })
  }, [])
  const subNavbarCheck = isMobile && pathname.split("/")[1] == "game-detail"
  const checkUrl = window.location.pathname
  const nav = useNavigate()
  useEffect(() => {
    const localStorageTOken = localStorage.getItem("token")
    if (!localStorageTOken) {
      nav("/login")
    }
  }, [])



  const [inactiveTime, setInactiveTime] = useState(120000); // 5 seconds of inactivity
  let timer; // variable to hold the timeout function

  useEffect(() => {
      const resetTimer = () => {
          clearTimeout(timer);
          timer = setTimeout(callInactiveFunction, inactiveTime);
      };

      const callInactiveFunction = () => {
          // This function will be called after 'inactiveTime' milliseconds of user inactivity
          console.log("User is inactive");
          localStorage.clear()
          window.location.replace(login)
          // Call your function here that you want to execute when the user is inactive
      };

      const setupListeners = () => {
          // Add event listeners to detect user activity
          document.addEventListener('mousemove', resetTimer);
          document.addEventListener('keydown', resetTimer);
          document.addEventListener('visibilitychange', resetTimer); // For handling tab visibility changes
      };

      setupListeners(); // Initialize the listeners

      return () => {
          // Clean up the event listeners when the component unmounts
          document.removeEventListener('mousemove', resetTimer);
          document.removeEventListener('keydown', resetTimer);
          document.removeEventListener('visibilitychange', resetTimer);
      };
  }, [inactiveTime]);
  return (
    <div className='main-layout'>
      <div className="layout-nav-col">
        <Navbar />
        {isMobile &&
          <div className={`w-full grid grid-cols-${inplayMatches?.length} gap-1`} style={{padding: "0 5px 5px"}}>
            {inplayMatches?.map((item) => {
              return (

                <Blink key={item?.series_id} data={item} />
              )
            })}

          </div>
        }
        {subNavbarCheck || checkUrl.split("/")[1] == "casino-lobby" || checkUrl.split("/")[1] == "aviator-lobby" ?
          null : <SubNavbar />
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
    </div>
  )
}

export default MainLayout