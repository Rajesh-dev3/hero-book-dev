import { useEffect, useState } from 'react'

import { useGetSportListMutation } from '../../services/sport/sportList'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMediaQuery } from '../../useMediaQuery'
// styles 
import "./styles.scss"
import { accountStatement, activityLog, changePasswordPage, currentBet, home, unSetteledBet } from '../../routes/PagesUrl'

const SubNavbar = () => {
  const [trigger, { data }] = useGetSportListMutation()

  useEffect(() => {
    trigger({ limit: 50, pageno: 1 })
  }, [])
  const getTitle = (tabKey) => {
    let result = "";
    result = tabKey && tabKey.sport_id && tabKey.sport_id === 1 ? "Football" : tabKey.name;
    return result;

  };
  const isMobile = useMediaQuery("(max-width:780px)")
  const casinoArray =  [
    {
      name: "Aviator",
      link: "/aviator-lobby",

    },
    // {
    //   name:"Sport",
    //   link:"",
    // },
    {

      name: "Baccart",
      link: "/casino/BACCARAT"
    }, {
      name: "32 Cards",
      link: "/casino/32_CARD"
    }, {
      name: "Teenpatti", link: "/casino/TEENPATTI"
    }, {
      name: "Poker",
      link: "/casino/POKER"
    },
    {
      name: "Lucky 7",
      link: "/casino/Lucky_7"
    }
  ]

  const mobileCasino = [
    {
      name: "Aviator",
      link: "/aviator-lobby",
    },
    {
      name: "Sport",
      link: "/",
    },
    {
      name: "OUR CASINO",
      link: "/casino/ourCasino"

    }, {
      name: "LIVE CASINO",
      link: "/livecasino"
    }
    , {
      name: "SLOTS",
      link: "/slot"
    }
    , {
      name: "FANTASY",
      link: "/fantasy"
    }
  ]
  const MobileCasino = isMobile? mobileCasino:casinoArray
  

const {pathname} = useLocation()
const urlList = ["/","/account-statement","/current-bet","/activity_log","/changepassword","/casino-results","live-casino-bet","/secure-auth"]
  const checkActiveUrl  = {Home:"/",Cricket:"/sport/4",Tennis:"/sport/2",Soccer:"/sport/1"}

const urlCheck = pathname?.split("/")[1]
const urlList2 = ["/"]
  const checkUrl = isMobile && urlList.includes(pathname)
  const checkUrl2 =  urlList2.includes(pathname)
console.log(checkUrl2,"url1")
// console.log(pathname.split("/")[2],"pathname")
  // const newSPortArray = [...data?.data,...casinoArray]
const [newSPortArray, setNewSPortArray] = useState([])

  useEffect(() => {
    if(data?.data){

      const getSportName = isMobile ?[]: data?.data?.map((item)=>{return{name:item?.name,link:checkActiveUrl[item?.name]}})
      const newSPortArray = [ isMobile?null:{name:"Home",link:"/"},...getSportName,...MobileCasino]
      setNewSPortArray(newSPortArray)
    }
  }, [data?.data])
  

  const isActive = (itemLink, pathname) => {
    // Special case: Direct comparison for /aviator-lobby


    const urList = [unSetteledBet,home,accountStatement,currentBet,activityLog,"/casino-results","/secure-auth",changePasswordPage]
    
if(isMobile){
  return pathname === itemLink
}
    else if (pathname == '/aviator-lobby' || urList.includes(pathname)) {
      return pathname == itemLink;
    }else{

      return pathname.split('/')[2] == itemLink.split('/')[2];
    }
  
    // General case: Split pathname and compare
  };
  const checkUrlAndMobile = isMobile==false && urlCheck == "game-detail" 
  return (
    <>
    {checkUrl ==false  && checkUrlAndMobile  &&
    <div className="subnavbar-container">
      <ul>
        {newSPortArray?.map((item,index) => {
          if(item?.name != "Casino" && item != null){
            return(
              <Link to={item?.link} key={item?.name}  className={`${isActive(item?.link, pathname) ? 'tab-list-active' : 'tabs-list'}`}><li className={index==0?"p-left":""}>{item?.name == "Soccer"?"Football":item?.name}</li></Link>
            )
          }
        }
        )}
      </ul>
    </div>
    }

{checkUrl2 &&    <div className="subnavbar-container">
      <ul>
        {newSPortArray?.map((item,index) => {
          if(item?.name != "Casino" && item != null){
            return(
              <Link to={item?.link} key={item?.name}  className={`${isActive(item?.link, pathname) ? 'tab-list-active' : 'tabs-list'}`}><li className={index==0?"p-left":""}>{item?.name == "Soccer"?"Football":item?.name}</li></Link>
            )
          }
        }
        )}
      </ul>
    </div>}
    </>
  )
}

export default SubNavbar
