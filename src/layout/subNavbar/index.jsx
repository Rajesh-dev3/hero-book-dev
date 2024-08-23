import { useEffect, useState } from 'react'

import { useGetSportListMutation } from '../../services/sport/sportList'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMediaQuery } from '../../useMediaQuery'
// styles 
import "./styles.scss"

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
  const casinoArray = [
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
      link: "",
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
  const isMobile = useMediaQuery("(max-width:780px)")
  const casino = isMobile ? mobileCasino : casinoArray
  const [listActive, setListActive] = useState(0)
const {pathname} = useLocation()
const urlList = ["/account-statement","/current-bet","/activity_log","/changepassword","/casino-results","live-casino-bet","/secure-auth"]
  const checkActiveUrl  = ["/","/sport/4","/sport/2"]

  const checkUrl = isMobile && urlList.includes(pathname)
  return (
    <>
    {!checkUrl && 
    <div className="subnavbar-container">
      <ul>
        {!isMobile &&
          <Link to={"/"} className={pathname == "/"?'tab-list-active':"tab-list"}>
            <li>Home</li>
          </Link>
        }
        {!isMobile ?
          data?.data?.map((item) => {
            return (
              <Link to={item?.name == "Casino" ? "/casino/ourCasino" : `/sport/${item?.sport_id}`} key={item?.name} className={"tab-list"}>
                <li >{getTitle(item)}</li>
              </Link>
            )
          }) : ""
        }

        {casino?.map((item,index) => <Link to={item?.link} key={item?.name} onClick={()=>setListActive(index+1)} className={`${listActive == index+1 && isMobile ?"subNav-list-active":"tabs-list"}`}><li >{item?.name}</li></Link>)}


      </ul>
    </div>
    }

    </>
  )
}

export default SubNavbar
