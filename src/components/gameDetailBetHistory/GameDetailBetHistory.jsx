import React, { useEffect } from 'react'
import {useBetListMutation} from "../../services/betList/BetList"
////styles
import "./styles.scss"
import { useParams } from 'react-router-dom'
const GameDetailBetHistory = () => {

  const [trigger,{data}]=useBetListMutation()
const {matchId}= useParams()
  useEffect(() => {
   trigger({"limit":10,"match_id":matchId,"market_id":"0","fancy_id":0,"pageno":1})
  }, [])
  
 
  return (
    <div className="sidebar-box my-bet-container">
    <div className="sidebar-title">
      <h4>My Bet</h4>
    </div>
    <div className="my-bets">
      <div className="table-responsive w-100">
        <table className="table">
        <thead><tr className='text-left'><th>Matched Bet</th><th className="text-center">Type</th><th className="text-center">Odds</th><th className="text-center">Stake</th><th className="text-center">P/L</th></tr></thead>
     
          <tbody>
            {data?.data?.MatchAndBetfair?.map((item)=>{
              return(

            <tr key={item?.marketName+item?.market_id}><td className="text-left pl-[5px]">{item?.selectionName}</td>
            <td className="text-center">{item?.is_back ==1?"Back":"Lay"}</td>
            <td className="text-center">{item?.odds}</td>
            <td className="text-center">{item?.stack}</td>
            <td className="text-center">{item?.p_l}</td>
            </tr>
              )
            })}
    
            </tbody>
       
        </table>
      </div>
    </div>
  </div>
  )
}

export default GameDetailBetHistory