import { useEffect } from "react";
import { useGetSportListMutation } from "../../services/sport/sportList"
import Bat from "../../assets/svg/bat.jsx"
import Tennis from "../../assets/svg/tennis.jsx"
import Football from "../../assets/svg/football.jsx"
import CasinoSvg from "../../assets/svg/casino.jsx"
import HorseRacing from "../../assets/svg/horseRacing.jsx"
import TabbleTennisSvg from "../../assets/svg/tableTennis.jsx"
import Kabaddisvg from "../../assets/svg/Kabaadi.jsx"
import BasketballSvg from "../../assets/svg/Basketball.jsx";
import AmericanFooterballSvg from "../../assets/svg/AmericanFooteball.jsx";
import ValleyBallSvg from "../../assets/svg/ValleyBall.jsx";
import { useNavigate } from "react-router-dom";
//styles
import "./styles.scss";
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
    4: <Bat />,
    2: <Tennis />,
    1: <Football />,
    111: <CasinoSvg />,
    200: <HorseRacing />,
    201: <TabbleTennisSvg />,
    202: <Kabaddisvg />,
    203: <BasketballSvg />,
    204: <AmericanFooterballSvg />,
    205: <ValleyBallSvg />,
  }

  const getTitle = (tabKey) => {
    let result = "";
    result = tabKey && tabKey.sport_id && tabKey.sport_id === 1 ? "Football" : tabKey.name;
    return result;

  };

  const sportListArray = [
    {
      name: "horse racing",
      sport_id: 200,
    },
    {
      name: "Greyhound racing",
      sport_id: 200,
    },
    {
      name: "table tennis",
      sport_id: 201,
    },
    {
      name: "kabaddi",
      sport_id: 202,
    },
    {
      name: "badminton",
      sport_id: 201,
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
  return (
    <div className="home_tab w-full " >
      <ul className="tabs w-full overflow-x-scroll flex ">
        {
          data?.data?.map((item) => {
            return (

              <li
                key={item}
                onClick={() => handleTabClick(item?.sport_id, item?.name)}
                className={`${name == item?.name ? "active" : ""} flex`}
              >
                <div className="sport-icon"> {iconObj[item?.sport_id]}</div>
                {getTitle(item)}
              </li>
            )
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
                <div className="sport-icon">{iconObj[item?.sport_id]}</div>
                {getTitle(item)}
              </li>
            )
          })
        }

      </ul>
    </div>
  );
};

export default HomeTab;
