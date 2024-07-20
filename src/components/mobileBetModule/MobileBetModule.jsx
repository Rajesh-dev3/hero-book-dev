import  { useEffect, useState } from 'react'
///styles
import "./styles.scss"
import { useBetPlaceMutation } from '../../services/betPlace/BetPlace'
import { toast } from 'react-toastify'
import { formatCompactNumber } from '../betPlaceModule/BetPlaceModule'
const MobileBetModule = ({isFancy,stakeAmount,fun,betPlaceData,setBetPlaceData,openModal2}) => {
  const stakeArray = stakeAmount?.match_stack?.split(",")
  const [trigger,{data}]=useBetPlaceMutation()
  useEffect(() => {
    if(data?.error){
      toast.error(data?.message)
    }else if(data?.error == false){
      fun()
      toast?.success(data?.message)
    }
    }, [data])
     const [oddsValue, setOddsValue] = useState(0)

     
  return (
    <div>  <div className="title-model">
    <h4>Place Bet</h4>
  </div>
  <div className={`model-detail ${Number(betPlaceData?.is_back =="0")?"lay":"back"}`}>
    <div className="md1">
<div className="md1-left">
<p>{betPlaceData?.matchName}</p>
</div>
<div className="md1-right">
<p onClick={()=>setOddsValue(oddsValue-1)}>-</p>
<input type="text" placeholder='0' value={oddsValue} />
<p onClick={()=>setOddsValue(oddsValue+1)}>+</p>
</div>
    </div>
    <div className="md3">
      <input type="text" value={isFancy?betPlaceData?.run: betPlaceData?.odds} />
      <button onClick={()=>{
        const { matchName, ...updatedData } = betPlaceData;
        trigger({...updatedData,isFancy:isFancy,stack:oddsValue})}}>Submit</button>
      <p>0</p>
    </div>
    <div className="md2">
    {stakeArray?.map((item)=>{
                  return(

                    <div className="md2-data" key={item} onClick={()=>{
                      setOddsValue(oddsValue+Number(item))
                      setBetPlaceData((prev)=>{
                      return{
                        ...prev,stack:item
                      }
                    })}}>{formatCompactNumber(item)}</div>
                  )
                })}
    </div>
    <div className="md4">
      <button onClick={()=>openModal2()}>Edit</button>
    </div>
  
  </div></div>
  )
}

export default MobileBetModule