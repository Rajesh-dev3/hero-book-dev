import { useEffect, useRef, useState } from "react";
import { useGetSportListMutation } from "../../services/sport/sportList.js"

// import greyhound from '../../assets/game-icon/greyhound.png'
import CasinoSvg from "../../assets/svg/casino.jsx"

import { useNavigate } from "react-router-dom";
//styles
import "./styles.scss";
import { americanfootball, basketball, batminton, cricket, football, greyhound, horseRiding, snooker, tabletenis, vollyball } from "../../assets/index.jsx";
const HomeTab = ({ setActiveTab, setName, name }) => {

  const nav = useNavigate()
  const handleTabClick = (tabValue, matchName) => {
    if (tabValue == 111) {
      nav("casino/ourCasino")
      setActiveTab(tabValue);
    }
    setName(matchName)
    setActiveTab(tabValue);
  };


  const [trigger, { data }] = useGetSportListMutation()

  useEffect(() => {
    trigger({ limit: 50, pageno: 1 })
  }, [])
  const iconObj = {
    4: cricket,
    1: football,
    2: tabletenis,
    111: <CasinoSvg />,
    200: greyhound,
    201: snooker,
    202: batminton,
    203: basketball,
    204: americanfootball,
    205: vollyball,
    206: tabletenis,
    207: horseRiding,
  }

  // const getTitle = (tabKey) => {
  //   let result = "";
  //   result = tabKey && tabKey.sport_id && tabKey.sport_id === 1 ? "Football" : tabKey.name;
  //   return result;
 
  // };

  const sportListArray = [
    {
      name: "horse racing",
      sport_id: 207,
    },
    {
      name: "Greyhound racing",
      sport_id: 200,
    },
    {
      name: "table tennis",
      sport_id: 206,
    },
  
    {
      name: "badminton",
      sport_id: 202,
    },
    {
      name: "basketball",
      sport_id: 203,
    },
    {
      name: "american football",
      sport_id: 204,
    },
    {
      name: "volleyball",
      sport_id: 205,
    },
    {
      name: "snooker",
      sport_id: 201,
    },
  ]
  const [matchList, setMatchList] = useState([])
  useEffect(() => {
    
  if(data?.data){

    const extractNameSportid = data?.data?.map((item)=>{return{"name":item?.name,"sport_id":item?.sport_id}})
    const newMatchList= [...extractNameSportid,...sportListArray]
    setMatchList(newMatchList)

  }
  }, [data?.data])
  

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToItem = (index) => {
    const container = containerRef.current;
    const item = itemRefs.current[index];

    if (container && item) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset = itemRect.left - containerRect.left - (containerRect.width / 2) + (itemRect.width / 2);

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: 'smooth'
      });
    }
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    scrollToItem(index);
  };
  return (
    <div className="home_tab w-full " >
      {/* <ul className="tabs w-full overflow-x-scroll flex ">
        {
          data?.data?.map((item) => {
            if(item?.name != "Casino"){

              return (
                
                <li
                key={item}
                onClick={() => handleTabClick(item?.sport_id, item?.name)}
                className={`${name == item?.name ? "active" : ""} flex`}
                
                >
                <div className="sport-icon"><img src={iconObj[item?.sport_id]} alt="icon" /> </div>
                {getTitle(item)}
              </li>
            )
          }
          })
        }
        {
          sportListArray?.map((item) => {

              return (
                
                <li
                key={item}
                onClick={() => handleTabClick(item?.sport_id, item?.name)}
                className={`${name == item?.name ? "active" : ""} flex`}
                >
                <div className="sport-icon"><img src={iconObj[item?.sport_id]} alt="icon" /> </div>
                {getTitle(item)}
              </li>
            )
          })
        }

      </ul> */}
      <div className="menu-container" ref={containerRef}>
        {matchList.map((list, index) =>{
          if(list?.name != "Casino"){
            return(

            <div
            key={index}
            className={`menu-item ${index === selectedIndex ? 'active' : ''}`}
            ref={(el) => itemRefs.current[index] = el}
            onClick={() =>{

              
              handleItemClick(index)
              handleTabClick(list?.sport_id, list?.name)
            }
               }
          >
              <div className="sport-icon"><img src={iconObj[list?.sport_id]} alt="icon" /> </div>
           {list?.name}
          </div>
            )
          }
          
        })}
         {/* {
          sportListArray?.map((index) => {

              return (
                
                <li
                key={index}
                onClick={() => handleTabClick(index?.sport_id, index?.name)}
                className={`${name == index?.name ? "active" : ""} flex`}
                >
                <div className="sport-icon"><img src={iconObj[index?.sport_id]} alt="icon" /> </div>
                {getTitle(index)}
              </li>
            )
          })
        } */}

      </div>
    </div>
  );
};

export default HomeTab;
