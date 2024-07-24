
import { useEffect, useState } from "react";
import Blink from "../../components/blink/Blink.jsx";
import HomeTab from "../../components/hometab/HomeTab.jsx";
import OddsRow from "../../components/odds/OddsRow.jsx";
import OddsRowHeading from "../../components/odds/OddsRowHeading.jsx";
import { useEventGameMutation } from "../../services/sport/matchList.js";
import Loader from "../../components/loader/Loader.jsx"
import { useMediaQuery } from "../../useMediaQuery.js";
import Casino from "../casino/Casino.jsx";

///styles
import "./styles.scss"
const Home = () => {
  const [trigger, { data, isLoading }] = useEventGameMutation()
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState("Cricket");
  const [gameList, setGameList] = useState([])
  const isMobile = useMediaQuery("(max-width:780px)")
  useEffect(() => {
    trigger({ limit: 50, pageno: 1, sport_id: String(activeTab), series_id: 0, type: "home" })
  }, [activeTab])
  const upcomingMatches = data?.data?.UpCommingMatches || [];
  const inplayMatches = data?.data?.InplayMatches || [];
  const combinedMatches = [...inplayMatches, ...upcomingMatches];
  const findGame = combinedMatches?.filter((item) => item?.sport_id == activeTab ? item : [])
  useEffect(() => {

    if (data) {
      setGameList(findGame)
    }
  }, [data, activeTab])
  return (
    <>

      {!isMobile &&
        <div className={`w-full upcoming-event grid grid-cols-${inplayMatches?.length} gap-1`} style={{gridTemplateColumns:`repeat(${inplayMatches?.length}, 1fr)`}}>
          {inplayMatches?.map((item) => {
            return (
              <Blink key={item?.series_id} data={item} />
            )
          })}

        </div>
      }
      <HomeTab activeTab={activeTab} setActiveTab={setActiveTab} name={name} setName={setName} />
      {!isMobile &&
        <OddsRowHeading />
      }
      <div className="odd-container-m" >

        {isLoading ? <Loader /> : gameList?.length ?
          gameList?.map((item) => {
            return (
              <>

                <OddsRow item={item} key={item?.name} />
              </>
            )
          }) : "No Data Found"
        }
      </div>
      <div style={{ paddingTop: "10px" }}>

        <Casino />
      </div>
    </>
  );
};

export default Home;
