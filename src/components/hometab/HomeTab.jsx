import React, { useEffect, useState } from "react";
import {useGetSportListMutation} from "../../services/sport/sportList"
import "./styles.scss";

const HomeTab = ({setActiveTab,activeTab}) => {


  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

const matchNameId =[{
  name:"Cricket"
}]
const [trigger,{data}]=useGetSportListMutation()

useEffect(() => {
  trigger({limit:50,pageno:1})
}, [])

  return (
    <div className="home_tab w-full ">
      <ul className="tabs w-full overflow-x-scroll flex ">
        {
           data?.data?.map((item,index)=>{
            return(

        <li
        key={item}
          onClick={() => handleTabClick(item?.sport_id)}
          className={`${activeTab == item?.sport_id ? "active" : ""} flex`}
        >

          {item?.name} 
        </li>
            )
          })
        }
       
      </ul>
    </div>
  );
};

export default HomeTab;
