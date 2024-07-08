
import { useEffect, useState } from "react";
import Blink from "../../components/blink/Blink.jsx";
import HomeTab from "../../components/hometab/HomeTab.jsx";

import OddsRow from "../../components/odds/OddsRow.jsx";
import OddsRowHeading from "../../components/odds/OddsRowHeading.jsx";
import { useEventGameMutation } from "../../services/sport/matchList.js";
const Home = () => {
  const [trigger,{data}]= useEventGameMutation()
  const [activeTab, setActiveTab] = useState(4);
  useEffect(() => {
    trigger({limit: 50, pageno: 1, sport_id: activeTab, series_id: 0, type: "home"})
  }, [activeTab])
  const gameList = data?.data?.UpCommingMatches?.length? data?.data?.UpCommingMatches:data?.data?.InplayMatches
  return (
    <>
    <div className="w-full grid grid-cols-4 gap-1">
   <Blink/>
   <Blink/>
   <Blink/>
   <Blink/>
    </div>
    <HomeTab activeTab={activeTab} setActiveTab={setActiveTab}/>
  <OddsRowHeading/>
  {gameList?.map((item)=>{
    return(

      <OddsRow item={item} key={item?.name}/>
    )
  })}
   
    </>
  );
};

export default Home;
