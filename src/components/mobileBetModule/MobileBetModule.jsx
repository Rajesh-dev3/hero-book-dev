import { useEffect, useState } from 'react'
import { useBetPlaceMutation } from '../../services/betPlace/BetPlace'
import { toast } from 'react-toastify'
import { formatCompactNumber } from '../betPlaceModule/BetPlaceModule'
///styles
import "./styles.scss"
import BetLoader from '../loader/BetLoader'
import { betHistoryRef } from '../../pages/gameDetail/GameDetail'
import { exposureRef } from '../../layout/navbar'
const MobileBetModule = ({checkFancy, isFancy,profitLoss, stakeAmount, fun, betPlaceData, setBetPlaceData, openModal2 }) => {
  const stakeArray = stakeAmount?.match_stack?.split(",")
  const [trigger, { data,isLoading }] = useBetPlaceMutation()
  useEffect(() => {
    if (data?.error) {
      toast.error(data?.message)
      fun(false)
      setBetPlaceData((prev) => {
        return {
          ...prev, stack: ""
        }
      })
    } else if (data?.error == false) {
      betHistoryRef()
      exposureRef()
      fun(false)
      toast?.success(data?.message)
    }
  }, [data])
  const [oddsValue, setOddsValue] = useState()
  return (
    <div className='mobile-bet-place-container'> 
    {isLoading ?
       <div className={isLoading?"bet-loader-active":"bet-loader"}>
      <BetLoader/>
    </div>
      :""}
       <div className="title-model">
      <h4>Place Bet</h4>
    </div>
      <div className={`model-detail ${Number(betPlaceData?.is_back == "0") ? "lay" : "back"}`}>
        <div className="md1">
          <div className="md1-left">
            <p>{betPlaceData?.matchName}</p>
          </div>
          <div className="md1-right">
            <p >-</p>
            <input type="text" placeholder='0'  value={isFancy ? betPlaceData?.run : betPlaceData?.odds}/>
            <p>+</p>
          </div>
        </div>
        <div className="md3">
          <input type="text" value={oddsValue} onChange={(e)=>{
              setBetPlaceData((prev) => {
                return {
                  ...prev, stack: e.target.value
                }
              })
           setOddsValue(e.target.value)
          }}/>
          <button onClick={() => {
            const { matchName, ...updatedData } = betPlaceData;
            trigger({ ...updatedData, isFancy: isFancy, stack: oddsValue })
          }}>Submit</button>
          <p>{profitLoss?.length && profitLoss[0].winLoss && profitLoss[0].winLoss?.toFixed(2)}</p>
        </div>
        <div className="md2">
          {stakeArray?.map((item) => {
            return (

              <div className="md2-data" key={item} onClick={() => {
                setOddsValue(Number(item))
                setBetPlaceData((prev) => {
                  return {
                    ...prev, stack: item
                  }
                })
              }}>{formatCompactNumber(item)}</div>
            )
          })}
        </div>
        <div className="md4">
          <button onClick={() => openModal2()}>Edit</button>
        </div>
        <div className="matchName">  
          {
          checkFancy == "fancy" 
          ?
        
          <p>
            <span>Range: {profitLoss[0]?.minStack} to {profitLoss[0]?.maxStack}</span>
          </p> 
          :
          profitLoss?.map((elm)=>{
            if(elm?.marketId){
              if(checkFancy == true){

                  if(elm?.marketName){

                    return(
                      
                      <p>{elm?.marketName}  <span style={{color:elm?.winLoss>0?"green":"red"}}>{elm?.winLoss && elm?.winLoss?.toFixed(2)}</span></p>
                    )
                  }
              }else{

                return(
                  
                  <p>{elm?.marketId}  <span style={{color:elm?.winLoss>0?"green":"red"}}>{elm?.winLoss && elm?.winLoss?.toFixed(2)}</span></p>
                )
              }
            }
          })
        }
        </div>

      </div></div>
  )
}

export default MobileBetModule