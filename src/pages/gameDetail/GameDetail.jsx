import React, { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import GameDetailCollapse from "../../components/gameDetailCollapse/GameDetailCollapse";
import { Link, useParams } from "react-router-dom";
import GameDetailBetHistory from "../../components/gameDetailBetHistory/GameDetailBetHistory";
import BetPlaceModule from "../../components/betPlaceModule/BetPlaceModule"
///styles
import "./styles.scss";
import { useGetEventDetailsMutation } from "../../services/sport/eventDetail";
import { useGetEventSessionMutation } from "../../services/fancy/Fancy";
import moment from "moment";
const GameDetail = () => {
  const [openBetPlaceModule, setOpenBetPlaceModule] = useState(false)
  const [odddata, setOdddata] = useState();
  const [prevState, setPrevState] = useState();

  
  const [checkBackLay, setCheckBackLay] = useState("back")
  const openBetModuleHandler = (val)=>{
    setOpenBetPlaceModule(val)
  }

const [trigger,{data}]=useGetEventDetailsMutation()
const [trigg,{data:fancyData}]=useGetEventSessionMutation()

const {matchId,sportId} = useParams()
useEffect(() => {
  
const timer = setInterval(() => {
  trigger({"match_id":matchId,"sport_id":sportId})
  trigg({match_id: matchId})
}, 3000);
return () => clearInterval(timer);
}, [])

const oddsDataSta = prevState || odddata
useEffect(() => {
  if (data?.message === "Success") {
    if (!odddata) {
      setPrevState(data?.data);
    } else {
      setPrevState(odddata);
    }
    setOdddata(data?.data);
  }
  
}, [data])

const date  =moment(odddata?.MatchDetails?.start_date).format('DD/MM/YYYY, h:mm:ss');
  return (
    <div className="game-detail-container">
      <div className="game-detail-left-col">
        <div className="game-header">
          <span>{odddata?.MatchDetails?.name}</span>
          <span className="float-right">{date}</span>
        </div>
       
          <GameDetailCollapse collapseName="MATCH_ODDS" odddata={oddsDataSta?.MatchDetails} fun={openBetModuleHandler}/>
          <GameDetailCollapse collapseName="Bookmaker" odddata={oddsDataSta?.BookerMakerMarket}  fun={openBetModuleHandler}/>
          <GameDetailCollapse collapseName="Completed Match" odddata={oddsDataSta?.OtherMarketList[0]}  fun={openBetModuleHandler}/>
          <GameDetailCollapse collapseName="Tied Match" odddata={oddsDataSta?.OtherMarketList[1]}  fun={openBetModuleHandler}/>
        
      </div>
      <div className="game-detail-right-col">
        <Link
          className="bet-nation-game-name blink-message flex items-center p-[5px]"
          to="/"
        >
          <ErrorIcon />
          <div>Bollywood Casino</div>
        </Link>
        {openBetPlaceModule && 
        <BetPlaceModule fun={openBetModuleHandler}/>
        }
<GameDetailBetHistory />
      
      </div>
    </div>
  );
};

export default GameDetail;
