
////style
import "./styles.scss"
import DetailOdds from "./DetailOdds";
import { useMediaQuery } from "../../useMediaQuery";
const FancyDetailCollapse = ({profitLoss,fancyBetPlaceData,fancyProfitLoss,setCheckFancy,fun,odddata,collapseName,betPlaceHandler}) => {
  const oddsColor = ["back","back1","back2","lay","lay1","lay2"]
  const isMobile = useMediaQuery("(max-width:780px)")
  return (
    <div className="game-market market-4 ">
      <div className="market-title">
        <span>{collapseName}</span>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 grid-cols-1 gap-x-[15px]">
      <div className="market-header">
      
      <div className="fancy-row-container flex items-center" >
        <div className="odds-row-left-col px-[5px]">
         {/* <p>
           Max:1
          </p> */}
           </div>
        <div className="odds-row-right-col grid grid-cols-2 md:grid-cols-3">
          <DetailOdds height={28} display={"none"} />
          <DetailOdds height={28} display={"none"}/>
          <DetailOdds height={28} value={"No"}  item={oddsColor[3]} visiblePrice={true}/>
          <DetailOdds height={28} value={"Yes"}  item={oddsColor[0]} visiblePrice={true}/>
          <DetailOdds height={28} display={"none"}/>
          <DetailOdds height={28}display={"none"}/>
         
        </div>
      </div>
      </div>
      <div className="market-header second-odd-header">
      
      <div className="fancy-row-container flex items-center" >
        <div className="odds-row-left-col px-[5px]">
          {/* {!isMobile
          &&
         <p>
           Max:1
          </p>
        } */}
           </div>
        <div className="odds-row-right-col grid grid-cols-3">
          <DetailOdds height={28} display={"none"}/>
          <DetailOdds height={28} display={"none"}/>
          <DetailOdds height={28} value={"No"} item={oddsColor[3]} visiblePrice={true}/>
          <DetailOdds height={28} value={"Yes"}  item={oddsColor[0]} visiblePrice={true}/>
          <DetailOdds height={28} display={"none"}/>
          <DetailOdds height={28}display={"none"}/>
         
        </div>
      </div>
      </div>

      {odddata?.map((item,index)=>{
         const findSelectionId =  profitLoss?.map((elm) => {
          if (elm?.marketId == collapseName) {
            if (elm?.selectionId == item?.SelectionId) {
              return elm?.winLoss
            
            }
          }
        }) 
        return(

          <div className="fancy-row-container flex items-center" key={item?.RunnerName}>
          <div className="odds-row-left-col px-[5px]">{item?.RunnerName}
          <span style={{ color: findSelectionId[0] > 0 ? "green" : "red",display:"block" }}>{findSelectionId}</span>
          </div>
          <div className="odds-row-right-col relative grid grid-cols-2 md:grid-cols-3" onClick={()=>{
            setCheckFancy("fancy")
            fancyProfitLoss(fancyBetPlaceData?.stack, fancyBetPlaceData?.run, fancyBetPlaceData?.is_back, item?.SelectionId,collapseName ,item?.minStack,item?.maxStack)
          }}>
           
                <DetailOdds display={"none"}/>
                <DetailOdds display={"none"}/>
                <DetailOdds fancy={true} fancyId={item?.SelectionId}  index={index} matchName={item?.RunnerName} lay={0} marketId={odddata?.market_id} betPlaceHandler={betPlaceHandler} item={oddsColor[3]} key={item?.selectionName} price={item?.LaySize1} value={item?.LayPrice1} height={44} border={true} fun={fun} fancyStatus={item?.fancyStatus}/>
                <DetailOdds fancy={true} fancyId={item?.SelectionId} index={index} matchName={item?.RunnerName} lay={1} marketId={odddata?.market_id} betPlaceHandler={betPlaceHandler} item={oddsColor[0]} key={item?.selectionName} price={item?.BackSize1} value={item?.BackPrice1} height={44} border={true} fun={fun} fancyStatus={item?.fancyStatus}/>
                <DetailOdds display={"none"}/>
                <DetailOdds display={"none"}/>
            <div className="fancy-min-max">
              <span>Min:{item?.minStack}</span>
              <span>Max:{item?.maxStack}</span>
            </div>
            
            {item?.inplayStatus === "SUSPENDED"  || item?.inplayStatus === "CLOSE" || item?.inplayStatus === "Ball Running" ?
           <div className="suspend absolute w-full h-full text-[red] font-bold flex items-center justify-center">
            {item?.inplayStatus === "Ball Running"?"Ball Running":"SUSPENDED"}
           </div>:""
          }
          </div>
        </div>
        )
      })}
      </div>
  
     
    </div>
  )
};

export default FancyDetailCollapse;

