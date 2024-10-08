import { useEffect } from 'react'
import { useBetPlaceMutation } from "../../services/betPlace/BetPlace"
import { toast } from 'react-toastify';
///styles
import "./styles.scss"
import BetLoader from '../loader/BetLoader';
import { betHistoryRef } from '../../pages/gameDetail/GameDetail';
import { exposureRef } from '../../layout/navbar';
export function formatCompactNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(0) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(0) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(0) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(0) + "T";
  }
}
const BetPlaceModule = ({ profitLoss, isFancy, stakeAmount, fun, betPlaceData, openModal2, setBetPlaceData }) => {
  const stakeArray = stakeAmount?.match_stack?.split(",")
  const [trigger, { data,isLoading }] = useBetPlaceMutation()

  useEffect(() => {
   
    if (data?.error) {
      toast.error(data?.message)
      setBetPlaceData((prev) => {
        return {
          ...prev, stack: ""
        }
      })
      fun(false)
    } else if (data?.error == false) {
      // openModal2()
      betHistoryRef()
      exposureRef()
      toast?.success(data?.message)
      fun(false)
      setBetPlaceData((prev) => {
        return {
          ...prev, stack: ""
        }
      })
    }

  }, [data])


  const betPlaceFun = (betData)=>{
    delete betData.matchName;
    trigger(betData)
  }
  return (
    <>
    
   
    <div className={`betPlace-module-container `} >
      {isLoading ?
    <div className={isLoading?"bet-loader-active":"bet-loader"}>
      <BetLoader/>
    </div>
      :""}
      <div className="bet-place-title">
        <h4>
          Place Bet
        </h4>
      </div>
      <div className={`bet-place-box ${betPlaceData?.is_back == 0 ? "lay" : "back"}`}>
        <div className="bet-place-header">
          <ul>
            <li>(Bet for)</li>
            <li>Odds</li>
            <li>Stake</li>
            <li>Profite</li>
          </ul>
        </div>
        <div className="place-bet-body">
          <ul>
            <li>
              {betPlaceData?.matchName}
            </li>
            <li>
              <input type="number" value={isFancy ? betPlaceData?.run : betPlaceData?.odds} />
            </li>
            <li>
              <input type="number" value={isFancy ? betPlaceData?.stack : betPlaceData?.stack} onChange={(e) => setBetPlaceData((prev) => {
                return {
                  ...prev, stack: e.target.value == "" ? "" : Number(e.target.value)
                }
              })} />
            </li>
            <li>{profitLoss?.length && profitLoss[0].winLoss && profitLoss[0].winLoss?.toFixed(2)}</li>
          </ul>
        </div>
        <div className="place-bet-buttons">
          {stakeArray?.map((item) => {
            return (

              <button className="btn btn-place-bet" key={item} onClick={() => setBetPlaceData((prev) => {
                return {
                  ...prev, stack: Number(item)
                }
              })}>{formatCompactNumber(item)}</button>
            )
          })}

        </div>
        <div className="place-bet-action-buttons"><div>
          <button className="btn btn-info" onClick={openModal2}>Edit</button></div>
          <div>
            <button className="btn btn-danger me-1" onClick={() => {
              fun(false)
              setBetPlaceData((prev) => {
                return {
                  ...prev, stack: ""
                }
              })
            }}>Reset</button>
            <button className="btn btn-success" disabled="" onClick={() =>betPlaceFun({ ...betPlaceData, isFancy: isFancy })}>Submit</button></div></div>
      </div>
    </div>
    </>
  )
}

export default BetPlaceModule