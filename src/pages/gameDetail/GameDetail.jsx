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
const GameDetail = () => {
  const [openBetPlaceModule, setOpenBetPlaceModule] = useState(false)
  const [odddata, setOdddata] = useState();
  const [fancyData, setFancyData] = useState()
  const [prevState, setPrevState] = useState();

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
    if (fancy?.message === "Success") {
      if (!fancyData) {
        setFancyData(fancy?.data);
      } else {
        setFancyData(fancyData);
      }
      setFancyData(fancy?.data);
    }

  }, [data, fancy])

  const normalFancy = fancyData?.filter((item) => item?.fancy_category === "normal" ? item : [])
  const overbyover = fancyData?.filter((item) => item?.fancy_category === "overbyover")
  const ballbyball = fancyData?.filter((item) => item?.fancy_category === "ballbyball")


  const date = moment(Number(odddata?.MatchDetails?.start_date)).format('DD/MM/YYYY, h:mm:ss');

  const [betPlaceData, setBetPlaceData] = useState({
    is_back: "0",

    match_id: Number(matchId),
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
        ...prev, ...val, market_id: selectionId,
      }
    })
  }
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
    setModalOpen(false);
  };
  const closeModa2 = () => {
    setModalOpen2(false)
  };
  const openModal2 = () => {
    setModalOpen2(true)
  }

  return (
    <>
      <ModalComp isOpen={modalOpen} onClose={closeModal} content={<MobileBetModule openModal2={openModal2} fun={openModal} isFancy={isFancy} stakeAmount={odddata?.UserSportSettings[0]} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />} />
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
         <ScoreBoardCom odddata={odddata}date={date} matchId={matchId}/>
            {oddsDataSta?.MatchDetails ?
              <GameDetailCollapse collapseName="MATCH_ODDS" odddata={oddsDataSta?.MatchDetails} fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
              : ""}
            {oddsDataSta?.BookerMakerMarket ?
              <GameDetailCollapse collapseName="Bookmaker" odddata={oddsDataSta?.BookerMakerMarket} fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
              : ""}
            {normalFancy?.length ?
              <FancyDetailCollapse collapseName="Normal" odddata={normalFancy} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} />
              : ""}
            {overbyover?.length ?
              <FancyDetailCollapse collapseName="overbyover" odddata={overbyover} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} /> : ""
            }
            {ballbyball?.length ?
              <FancyDetailCollapse collapseName="ballbyball" odddata={ballbyball} betPlaceHandler={fancyBetPlaceHandler} fun={isMobile ? openModal : openBetModuleHandler} /> : ""
            }
         
            {oddsDataSta?.OtherMarketList?.length ?
              oddsDataSta?.OtherMarketList?.map((item, i) => {
                return (

                  <GameDetailCollapse key={item?.marketName + i} collapseName={item?.marketName} odddata={item} fun={isMobile ? openModal : openBetModuleHandler} betPlaceHandler={betPlaceHandler} />
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
              <BetPlaceModule isFancy={isFancy} stakeAmount={odddata?.UserSportSettings[0]} fun={openBetModuleHandler} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />
            }
            <GameDetailBetHistory />

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
              <BetPlaceModule openModal2={openModal2} isFancy={isFancy} stakeAmount={odddata?.UserSportSettings[0]} fun={isMobile ? openModal : openBetModuleHandler} betPlaceData={isFancy ? fancyBetPlaceData : betPlaceData} setBetPlaceData={isFancy ? setFancyBetPlaceData : setBetPlaceData} />
            }
            <GameDetailBetHistory />

          </div>}

      </div>
    </>
  );
};

export default GameDetail;
