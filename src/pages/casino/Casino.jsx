
import FilterSlider from "../../components/filterSlider/FilterSlider";
import CasinoCard from "../../components/casinoCard/CasinoCard";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "../../useMediaQuery";
import ourCasino from "../../components/casino/ourCasino.json"
import ourVirtualCasino from "../../components/casino/ourVirtualCasino.json"
import { casinoArray } from "../../components/filterSlider/FilterCategorydata"

///styles
import "./styles.scss"
const Casino = () => {
  const isMobile = useMediaQuery("(max-width:780px)")

  const [casinoData, setCasinoData] = useState([])
  const { casinoType } = useParams()
  const { pathname } = useLocation()
  const [activeCasino, setActiveCasino] = useState("OUR CASINO")
  const [activeValue, setActiveValue] = useState("ALL_CASINO");
  const path = pathname.split("/")[1]
  useEffect(() => {
    // Simulate fetching data from JSON file (like an API call)
    try {
      if (path == "casino") {
        setCasinoData(ourCasino[casinoType])
      }
      // Simulate delay (optional)
      if (casinoType == "ourCasino") {

        const findCasinoType = ourCasino[activeValue]
        setCasinoData(findCasinoType)
      } else if (casinoType == "our-virtual") {
        const findCasinoType = ourVirtualCasino[activeValue]
        setCasinoData(findCasinoType)

      }
    } catch (err) {
      return err
    }

  }, [pathname, casinoType, activeCasino, activeValue]);




  const path2 = pathname.split("/")[2]
  const casinoTypeName = [{ name: "OUR CASINO", link: "ourCasino" }, {
    name: "OUR VIRTUAL", link: "our-virtual"
  }];
  const data = casinoArray.filter((elm) => elm?.casinoName == "ourCasino")
  // console.log(data,"casinoArray")
  return (
    <div>
      {pathname == "our-virtual" || !isMobile?"":
      <ul className="casino-category">
        {casinoTypeName?.map((elm) =>
          <Link key={elm} to={`/casino/${elm?.link}`}>
            <li className={`${elm?.name == activeCasino ? "active" : ""}`}
              onClick={() => setActiveCasino(elm?.name)}
              >{elm?.name}</li>
          </Link>
        )
        }


      </ul>
      }
      <FilterSlider data={data} activeValue={activeValue} setActiveValue={setActiveValue} />
  
      <div className="casino-container">
        {casinoData?.map((item, index) => {
          return (
            <CasinoCard item={item} key={index + item?.url} />
          )
        })}

      </div>
    </div>
  );
};

export default Casino;
