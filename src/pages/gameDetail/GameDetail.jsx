import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import GameDetailCollapse from "../../components/gameDetailCollapse/GameDetailCollapse";
import FancyDetailCollapse from "../../components/gameDetailCollapse/FancyDetailCollapse";
import { Link, useParams } from "react-router-dom";
import GameDetailBetHistory from "../../components/gameDetailBetHistory/GameDetailBetHistory";
import BetPlaceModule from "../../components/betPlaceModule/BetPlaceModule"
import { useGetEventDetailsMutation } from "../../services/sport/eventDetail";
import { useGetEventSessionMutation } from "../../services/fancy/Fancy";
import TvIcon from '@mui/icons-material/Tv';
import moment from "moment";
import MobileBetModule from "../../components/mobileBetModule/MobileBetModule"
import { useMediaQuery } from "../../useMediaQuery";
import EditStack from "../../components/EditStack/EditStack";
import ModalComp from "../../components/modal/Modal";
import ScoreBoardCom from "../../components/scoreBoardCom/ScoreBoardCom"
///styles
import "./styles.scss";
import { aviatorLobby } from "../../routes/PagesUrl";
import { useBetListMutation } from "../../services/betList/BetList";

export let betHistoryRef;
const GameDetail = () => {
  const [openBetPlaceModule, setOpenBetPlaceModule] = useState(false)
  const [odddata, setOdddata] = useState();
  const [fancyData, setFancyData] = useState()
  const [prevFancy, setPrevFancy] = useState()
  const [prevState, setPrevState] = useState();
  const [profitLoss, setProfitLoss] = useState([])

  const openBetModuleHandler = (val) => {
    setOpenBetPlaceModule(val)
  }

  const [trigger, { data }] = useGetEventDetailsMutation()
  const [trigg, { data: fancy }] = useGetEventSessionMutation()

  const { matchId, sportId, selectionId } = useParams()
  useEffect(() => {

    trigger({ "match_id": matchId, "sport_id": sportId })
    trigg({ match_id: matchId })
    const timer = setInterval(() => {
      trigger({ "match_id": matchId, "sport_id": sportId })
      trigg({ match_id: matchId })
    }, 3000);
    return () => clearInterval(timer);
  }, [sportId, matchId])

  const oddsDataSta = odddata
  useEffect(() => {
    if (data?.message === "Success") {
      if (!odddata) {
        setPrevState(data?.data);
      } else {
        setPrevState(odddata);
      }
      setOdddata(data?.data);
    }
    if (fancy?.message === "Success") {
      if (!fancyData) {
        setPrevFancy(fancy?.data);
      } else {
        setPrevFancy(fancyData);
      }
      setFancyData(fancy?.data);
    }

  }, [data, fancy])

  const normalFancy = fancyData?.filter((item) => item?.fancy_category === "normal")
  const overbyover = fancyData?.filter((item) => item?.fancy_category === "overbyover")
  const ballbyball = fancyData?.filter((item) => item?.fancy_category === "ballbyball")

  ///prev fancy
  const prevNormalFancy = prevFancy?.filter((item) => item?.fancy_category === "normal")
  const prevOverbyover = prevFancy?.filter((item) => item?.fancy_category === "overbyover")
  const prevBallbyball = prevFancy?.filter((item) => item?.fancy_category === "ballbyball")


  const date = moment(
    parseInt(
      odddata?.MatchDetails && odddata?.MatchDetails?.start_date ? odddata?.MatchDetails?.start_date : null,
    ) * 1000,
  )
    .utcOffset("+05:30")
    .format("DD/MM/YYYY, HH:mm:ss ")
const [checkBookMaker,setBookMaker]=useState(0)
  const [betPlaceData, setBetPlaceData] = useState({
    is_back: "0",
    match_id:String(matchId),
    odds: "",
    selection_id: 0,
    stack: null
  })
  const [isFancy, setIsFancy] = useState(false)
  const [fancyBetPlaceData, setFancyBetPlaceData] = useState(
    {
      "fancy_id": "19",
      "is_back": "0",
      "match_id": matchId,
      "run": 0,
      "size": 0,
      "sport_id": sportId,
      "stack": null,
      "fancyStatus": "A"
    }
  )


  const betPlaceHandler = (val) => {
    setIsFancy(false)
    setBetPlaceData((prev) => {
      return {
        ...prev, ...val, market_id:val?.market_id,
      }
    })
  }
  useEffect(()=>{
    setBetPlaceData((prev)=>{
      return{
        ...prev,market_id:checkBookMaker? `${selectionId}_B`:selectionId,
        match_id:checkBookMaker? String(matchId):String(matchId)

      }
    })
  },[checkBookMaker])
  const fancyBetPlaceHandler = (val) => {
    setIsFancy(true)
    setFancyBetPlaceData((prev) => {
      return {
        ...prev, ...val,
      }
    })
  }
  const isMobile = useMediaQuery("(max-width:780px")

  const [tabOpen, setTabOpen] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false)


  const openModal = () => {
    setModalOpen(true)
  };

  const closeModal = () => {
    setBetPlaceData((prev) => {
      return {
        ...prev, stack: ""
      }
    })
    setFancyBetPlaceData((prev) => {
      return {
        ...prev, stack: ""
      }
    })
    setModalOpen(false);
  };
  const closeModa2 = () => {
    setModalOpen2(false)
  };
  const openModal2 = () => {
    setModalOpen2(true)
  }
  const [checkFancy, setCheckFancy] = useState(false)




const [selectionId2, setSelectionId] = useState("")

const profithandler = (stack, odds, is_back, eventId) => {


  const stackWin = odds == 0 ? -Number(stack) : (Number(odds) - 1) * Number(stack);
  const findIndex = ((index) => {
    if (checkFancy == true) {
      return eventId?.runner_json?.length ? eventId?.runner_json[index]?.selectionId : null
    } else if (checkFancy == false) {
      return eventId?.runner_json?.length ? eventId?.runner_json[index]?.selectionId : null
      // return eventId?.length ? eventId[index]?.selectionId : null
    }
  })
  // const obj = [
  //   {
  //     selectionId: findIndex(0),
  //     marketName:eventId?.runner_json?.[0]?.selectionName,
  //     marketId:checkFancy?  eventId?.market_id:eventId?.runner_json?.[0]?.selectionName,
  //     winLoss: stack
  //           ? (odds == 0 
  //                     ? -Number(stack) 
  //                     : (is_back == 0 
  //                         ? -Number(stackWin) 
  //                         : Number(stackWin))
  //                   )
  //                 : ""
  //   },
  //   {
  //     selectionId: findIndex(1),
  //     marketName:eventId?.runner_json?.[1]?.selectionName,
  //     marketId:  checkFancy?  eventId?.market_id:eventId?.runner_json?.[1]?.selectionName ,
  //     winLoss: stack
  //           ? (odds == 0 
  //               ? -Number(stack) 
  //               : (is_back == 1 
  //                   ? -Number(stack) 
  //                   : Number(stack))
  //             )
  //           : ""
  //   },
  //   {
  //     selectionId: findIndex(2),
  //     marketName:eventId?.runner_json?.[2]?.selectionName,
  //     marketId:checkFancy?  eventId?.market_id:eventId?.runner_json?.[2]?.selectionName,
  //     winLoss: stack
  //                 ? (odds == 0 
  //                     ? -Number(stack) 
  //                     : (is_back == 1 
  //                         ? -Number(stack) 
  //                         : Number(stack))
  //                   )
  //                 : ""
  //   }
  // ];
  const obj = [
    {
      selectionId: findIndex(0),
      marketName:eventId?.runner_json?.[0]?.selectionName,
      marketId:!checkFancy?  eventId?.market_id:eventId?.runner_json?.[0]?.selectionName,
      winLoss: stack
            ? (odds == 0 
                      ? -Number(stack) 
                      : (is_back == 0 
                          ? -Number(stackWin) 
                          : Number(stackWin))
                    )
                  : ""
    },
    {
      selectionId: findIndex(1),
      marketName:eventId?.runner_json?.[1]?.selectionName,
      marketId:  !checkFancy?  eventId?.market_id:eventId?.runner_json?.[1]?.selectionName ,
      winLoss: stack
            ? (odds == 0 
                ? -Number(stack) 
                : (is_back == 1 
                    ? -Number(stack) 
                    : Number(stack))
              )
            : ""
    },
    {
      selectionId: findIndex(2),
      marketName:eventId?.runner_json?.[2]?.selectionName,
      marketId:!checkFancy?  eventId?.market_id:eventId?.runner_json?.[2]?.selectionName,
      winLoss: stack
                  ? (odds == 0 
                      ? -Number(stack) 
                      : (is_back == 1 
                          ? -Number(stack) 
                          : Number(stack))
                    )
                  : ""
    }
  ];
  setProfitLoss(obj)
  
  
}


const fancyProfitLoss= (stack,odds,is_back,eventId,eventName,minStack,maxStack)=>{
  const obj = [   {
    selectionId: eventId,
    marketId: eventName,
    minStack:minStack,
    maxStack:maxStack,
    winLoss: stack
          ? (odds == 0 
              ? -Number(stack) 
              : (is_back == 0 
                  ? -Number(stack) 
                  : Number(stack))
            )
          : ""
  },];
  setProfitLoss(obj)
}
useEffect(() => {
  if (checkFancy == false ) {
    if (betPlaceData?.stack != null) {
      profithandler(betPlaceData?.stack, betPlaceData?.odds, betPlaceData?.is_back, selectionId2)
    }
  } else if (checkFancy == true) {
    if (betPlaceData?.stack != null ) {
      profithandler(betPlaceData?.stack, betPlaceData?.odds, betPlaceData?.is_back, selectionId2)
    }

  }

}, [betPlaceData, selectionId2])

useEffect(() => {
   if(checkFancy == "fancy"){
    if (fancyBetPlaceData?.stack != null ) {
      fancyProfitLoss(fancyBetPlaceData?.stack, fancyBetPlaceData?.odds, fancyBetPlaceData?.is_back,profitLoss[0]?.selectionId , profitLoss[0]?.marketId,profitLoss[0]?.minStack,profitLoss[0]?.maxStack)
    }
  }
  
}, [fancyBetPlaceData])

const [trig,{data:betHistory}]=useBetListMutation()
const betHistoryData =betHistory ? [...betHistory?.data?.MatchAndBetfair , ...betHistory?.data?.MatchFancy]:[]

  useEffect(() => {
   trig({"limit":10,"match_id":matchId,"market_id":"0","fancy_id":0,"pageno":1})
  }, [])

  const trigFun = ()=>{
    trig({"limit":10,"match_id":matchId,"market_id":"0","fancy_id":0,"pageno":1})
  }
  betHistoryRef = trigFun

  return (
    <>
      <ModalComp setBetPlaceData={setBetPlaceData} isOpen={modalOpen} onClose={closeModal} content={
       <MobileBetModule checkFancy={checkFancy} profitLoss={profitLoss}  setProfitLoss={setProfitLoss} isFancy={isFancy} openModal2={openModal2} fun={closeModal}  stakeAmount={odddata?.UserSportSettings[0]} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />
        } />
      <ModalComp isOpen={modalOpen2} onClose={closeModa2} content={<EditStack closeModa2={closeModa2} />} />

      {isMobile &&
        <div className="mobile-odds-tab">
          <ul>
            <li onClick={() => setTabOpen(0)}>Odds</li>
            <li onClick={() => setTabOpen(1)}>Matched Bet</li>
            <li onClick={() => setTabOpen(2)}>{<TvIcon />}</li>
          </ul>
        </div>
      }
      <div className="game-detail-container">
        {tabOpen == 0
          &&
          <div className="game-detail-left-col">
         <ScoreBoardCom odddata={odddata} date={date} matchId={matchId}/>
            {oddsDataSta?.MatchDetails?.runner_json ?
              <GameDetailCollapse  checkFancy={false} profithandler={profithandler} setSelectionId={setSelectionId} selectionId={selectionId2} setCheckFancy={setCheckFancy}  profitLoss={profitLoss} betPlaceData={betPlaceData} setProfitLoss={setProfitLoss} collapseName="MATCH_ODDS" odddata={oddsDataSta?.MatchDetails} prevOdd={prevState?.MatchDetails} fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
              : ""}
            {oddsDataSta?.BookerMakerMarket?.runner_json ?
              <GameDetailCollapse checkBookmaker={checkBookMaker} min={true} checkFancy={false} setBookMaker={setBookMaker} profithandler={profithandler} setSelectionId={setSelectionId} selectionId={selectionId2} setCheckFancy={setCheckFancy} profitLoss={profitLoss} betPlaceData={betPlaceData} setProfitLoss={setProfitLoss} collapseName="Bookmaker" prevOdd={prevState?.BookerMakerMarket} odddata={oddsDataSta?.BookerMakerMarket} fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
              : ""}
            {normalFancy?.length ?
              <FancyDetailCollapse checkFancy="fancy" prevFancy={prevNormalFancy} profitLoss={profitLoss} fancyBetPlaceData={fancyBetPlaceData} fancyProfitLoss={fancyProfitLoss} setCheckFancy={setCheckFancy} collapseName="Normal" odddata={normalFancy} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} />
              : ""}
            {overbyover?.length ?
              <FancyDetailCollapse checkFancy="fancy" prevFancy={prevOverbyover} profitLoss={profitLoss} fancyBetPlaceData={fancyBetPlaceData} fancyProfitLoss={fancyProfitLoss} setCheckFancy={setCheckFancy} collapseName="overbyover" odddata={overbyover} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} /> : ""
            }
            {ballbyball?.length ?
              <FancyDetailCollapse checkFancy="fancy" prevFancy={prevBallbyball} profitLoss={profitLoss} fancyBetPlaceData={fancyBetPlaceData} fancyProfitLoss={fancyProfitLoss} setCheckFancy={setCheckFancy} collapseName="ballbyball" odddata={ballbyball} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} /> : ""
            }
         
            {oddsDataSta?.OtherMarketList?.length ?
              oddsDataSta?.OtherMarketList?.map((item, i) => {
                return (
                  <GameDetailCollapse checkFancy={false} profithandler={profithandler} setSelectionId={setSelectionId} selectionId={selectionId2} setCheckFancy={setCheckFancy}  profitLoss={profitLoss} betPlaceData={betPlaceData} setProfitLoss={setProfitLoss} key={item?.marketName + i} collapseName={item?.marketName} odddata={item} prevOdd={item}  fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
                )
              }):""
            }

          </div>
        }
        {tabOpen == 1 ?
          <div className="game-detail-right-col" style={{ width: tabOpen == 1 ? "100%" : "", display: tabOpen == 1 ? "block" : "" }}>
            <Link
              className="bet-nation-game-name blink-message flex items-center p-[0px] md:p-[5px]"
              to="/"
            >
              {!isMobile &&
                <>
                  <ErrorIcon />
                  <div>Bollywood Casino</div>
                </>
              }
            </Link>
            {openBetPlaceModule &&
              <BetPlaceModule profitLoss={profitLoss} setProfitLoss={setProfitLoss} isFancy={isFancy} stakeAmount={odddata?.UserSportSettings[0]} fun={openBetModuleHandler} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />
            }
            <GameDetailBetHistory data={betHistoryData}/>

          </div> :
          <div className="game-detail-right-col" >
            <Link
              className="bet-nation-game-name blink-message flex items-center p-[5px]"
              to={aviatorLobby}
            >

              <ErrorIcon />
              <div>Aviator</div>
            </Link>
            {openBetPlaceModule &&
              <BetPlaceModule  profitLoss={profitLoss} openModal2={openModal2} isFancy={isFancy} stakeAmount={odddata?.UserSportSettings[0]} fun={isMobile ? openModal : openBetModuleHandler} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />
            }
            <GameDetailBetHistory data={betHistoryData}/>

          </div>}

      </div>
    </>
  );
};

export default GameDetail;




