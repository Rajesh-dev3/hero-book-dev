import React from "react";
import HttpsIcon from '@mui/icons-material/Https';
import Tv from "../../assets/svg/tv";
import { bmIcon, facebook } from "../../assets";
import OddsButton from "./OddsButton";
////styles
import "./styles.scss";
import { Link } from "react-router-dom";
const OddsRow = ({item}) => {
  console.log(item?.runner_json[1].ex.availableToBack[0].price
  )
  return (
    <Link to={"/game-detail"}> 
    <div className="odds-row-container w-full flex justify-between gap-4">
      <div className="odds-row-left-col w-[60%] flex justify-between pl-2 items-center">
        <span className="text-[14px]">{item?.name}</span>
        <div className="icon-div flex
            items-center
            gap-[10px]">
              <div className="active-match"></div>
          <Tv />
          <img src={facebook} alt="" className=" h-[12px]"/>
          <img src={bmIcon} alt="" className=" h-[12px]" />
        </div>
      </div>
      <div className="odds-row-right-col w-[40%]">
        <ul className="w-full grid grid-cols-3 ">
          {/* {} */}
          
          <li  className="w-full grid grid-cols-2 relative">
            <OddsButton price={item && item?.runner_json[0].ex?.availableToBack[0].price? item?.runner_json[0].ex?.availableToBack[0].price:"-"}/>
          <div className="lock-odds bg-[#373636d6] absolute left-0 top-0 w-full h-full flex items-center justify-center">
<HttpsIcon/>
          </div>
          <OddsButton lay={true} price={item && item?.runner_json[0].ex?.availableToLay[0].price?item?.runner_json[0].ex?.availableToLay[0].price:"-"}/></li>
          <li  className="w-full grid grid-cols-2"><OddsButton price={"-"}/>
          <OddsButton lay={true}price={"-"}/></li> <li  className="w-full grid grid-cols-2"><OddsButton price={item?.runner_json[1].ex.availableToBack[0].price}/>
          <OddsButton lay={true} price={item?.runner_json[1].ex.availableToLay[0].price}/></li>
        </ul>
      </div>
    </div>
    </Link>
  );
};

export default OddsRow;
