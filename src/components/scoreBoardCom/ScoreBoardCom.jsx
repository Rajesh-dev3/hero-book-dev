import { useParams } from "react-router-dom"
import {useScoreBoardQuery} from "../../services/scoreBoard/scoreBoard"
////styles
import "./styles.scss"
import { useEffect } from "react"
const ScoreBoardCom = ({odddata,date,matchId}) => {


  const {data} = useScoreBoardQuery(matchId,{
    pollingInterval:1000
  })
 
  const calculateOvers = (balls) => {
    // Calculate the number of overs
    var overs = Math.floor(balls / 6) + ((balls % 6) / 10);
    return overs;
  }
  const two = data?.data?.length && data?.data[2]
  const zero = data?.data?.length && data?.data[0]
  return (
    <div className="score-board">

    <div className="game-header">
      <span>{odddata?.MatchDetails?.name}</span>
      <span className="float-right">{date}</span>
    </div>
    <div className="score-col">
      <div className="score-col-left">
        <p><span>{two?.t1 || 0}</span> <span>{two?.score || 0}-{two?.wicket || ""}({two?.ballsdone? calculateOvers(two?.ballsdone):0})</span></p>
        <p><span>{two?.t2 || 0}</span> <span>{two?.score2 || 0}-{two?.wicket2 || ""}({two?.ballsdone2? calculateOvers(two?.ballsdone2):"0.0"})</span></p>
      </div>
      <div className="score-col-right">    
         <p><span>{zero?.cb || "-"}</span></p>
      <p className="ball">
        {zero?.recentBalls?.[0]?.length ? zero?.recentBalls?.[0]?.map((item,i)=> <span key={item+i}>{item}</span>):"NA"}
       
      
      </p></div>
 
    </div>
    </div>
  )
}

export default ScoreBoardCom