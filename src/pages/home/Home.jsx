
import { useEffect } from "react";
import Blink from "../../components/blink/Blink.jsx";
import HomeTab from "../../components/hometab/HomeTab.jsx";

import OddsRow from "../../components/odds/OddsRow.jsx";
import OddsRowHeading from "../../components/odds/OddsRowHeading.jsx";
import { useEventGameMutation } from "../../services/sport/matchList.js";
const Home = () => {
  const [trigger,{data}]= useEventGameMutation()

  useEffect(() => {
    trigger({limit: 50, pageno: 1, sport_id: 4, series_id: 0, type: "home"})
  }, [])
  
  return (
    <>
    <div className="w-full grid grid-cols-4 gap-1">
   <Blink/>
   <Blink/>
   <Blink/>
   <Blink/>
    </div>
    <HomeTab/>
  <OddsRowHeading/>
  {data?.data?.UpCommingMatches.map((item)=>{
    return(

      <OddsRow item={item} key={item?.name}/>
    )
  })}
    {/* <OddsRow/>
    <OddsRow/>
    <OddsRow/> */}
    </>
  );
};

export default Home;
