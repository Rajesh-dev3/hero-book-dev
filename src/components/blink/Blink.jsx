import React from 'react'
import SportsCricketIcon from "@mui/icons-material/SportsCricket";

// style

import "./styles.scss";
import { Link } from 'react-router-dom';
const Blink = ({data}) => {

  return (
    <div className="latest-events">
     <div className="latest-event-item">
      <Link className="blink_me" to={`/game-detail/${data?.sport_id}/${data?.match_id}/${data?.market_id}`}>
        <i className="d-icon me-1 icon-4">
          <SportsCricketIcon/>
        </i>
        <span>{data?.name}</span></Link></div>
  </div>
  )
}

export default Blink