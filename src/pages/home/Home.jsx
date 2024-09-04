
import { useEffect, useState } from "react";
import Blink from "../../components/blink/Blink.jsx";
import HomeTab from "../../components/hometab/HomeTab.jsx";
import OddsRow from "../../components/odds/OddsRow.jsx";
import OddsRowHeading from "../../components/odds/OddsRowHeading.jsx";
import { useEventGameMutation } from "../../services/sport/matchList.js";
import { useMediaQuery } from "../../useMediaQuery.js";
import ourCasino from "../../components/casino/ourCasino.json"

///styles
import "./styles.scss"
import CasinoCard from "../../components/casinoCard/CasinoCard.jsx";
import { useGetEventListMutation } from "../../services/sport/inPlayEvent.js";
import BetLoader from "../../components/loader/BetLoader.jsx";
const Home = () => {
  const [trigger, { data, isLoading }] = useEventGameMutation()
  const [trigge, { data: eventList }] = useGetEventListMutation()
  const [activeTab, setActiveTab] = useState(4);
  const [name, setName] = useState("Cricket");
  const [gameList, setGameList] = useState([])
  const isMobile = useMediaQuery("(max-width:780px)")
  useEffect(() => {
    trigger({ limit: 50, pageno: 1, sport_id: String(activeTab), series_id: 0, type: "home" })
  }, [activeTab])
  useEffect(() => {
    trigge({ "limit": 10, "pageno": 1, "sport_id": 0 })
  }, [])
  const upcomingMatches = data?.data?.UpCommingMatches || [];
  const eventData = eventList?.data || [];
  const inplayMatches = data?.data?.InplayMatches || [];
  const combinedMatches = [...inplayMatches, ...upcomingMatches];
  const findGame = combinedMatches?.filter((item) => item?.sport_id == activeTab ? item : [])
  useEffect(() => {

    if (data) {
      setGameList(findGame)
    }
  }, [data, activeTab])
  const extractMatchId = eventData?.map((list) => { return { marketId: list?.market_id } })
  return (
    <>

      {(!isMobile && inplayMatches?.length) ?
        <div className={`w-full upcoming-event flex overflow-x-scroll gap-1`} style={{ gridTemplateColumns: `repeat(${inplayMatches?.length}, 1fr)` }}>
          {inplayMatches?.map((item) => <Blink key={item?.series_id} data={item} />)}

        </div>
        : ""}
      <HomeTab activeTab={activeTab} setActiveTab={setActiveTab} name={name} setName={setName} />
      {!isMobile &&
        <OddsRowHeading />
      }
      <div className="odd-container-m" >

        {isLoading ? <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>

          <BetLoader />
        </div> : gameList?.length ?
          gameList?.map((item) => {
            return (
              <>

                <OddsRow item={item} key={item?.name} inPlayMarketId={extractMatchId} />
              </>
            )
          }) : "No Data Found"
        }
      </div>
      <div >
        <div className="casino-container-10">
          {ourCasino["ALL_CASINO"]?.map((item, index) => {
            return (
              <CasinoCard item={item} key={index + item?.url} />
            )
          })}

        </div>
      </div>
    </>
  );
};

export default Home;
