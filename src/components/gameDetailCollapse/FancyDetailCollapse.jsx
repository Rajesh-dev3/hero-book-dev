
////style
import "./styles.scss"
import DetailOdds from "./DetailOdds";
import { useMediaQuery } from "../../useMediaQuery";
import ModalComp from "../modal/Modal";
import { useState } from "react";
import RunPosition from "../RunPosition";
import CustomIcon from "../../assets/svg/Stairs";
const FancyDetailCollapse = ({prevFancy,profitLoss,fancyBetPlaceData,fancyProfitLoss,setCheckFancy,fun,odddata,collapseName,betPlaceHandler}) => {
  const oddsColor = ["back","back1","back2","lay","lay1","lay2"]
  const [fancyRunPostioin, setFancyRunPostioin] = useState([])
  const [modalOpen2, setModalOpen2] = useState(false)
  const closeModal = () => {
    setModalOpen2(false)
  };
  const openModal = () => {
    setModalOpen2(true)
  }
  return (
    <>
    <ModalComp isOpen={modalOpen2} onClose={closeModal} content={<RunPosition closeModa2={closeModal} data={fancyRunPostioin}/>} />
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
        let checkScorePostion = item?.scorePostion
        const findSelectionId =  profitLoss?.map((elm) => {
          if (elm?.marketId == collapseName) {
            if (elm?.selectionId == item?.SelectionId) {
              return elm?.winLoss
              
            }
          }
        }) 
        
        return(

          <div className="fancy-row-container flex items-center" key={item?.RunnerName}>
          <div className="odds-row-left-col px-[5px]">
           <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            {item?.RunnerName} 
            <span onClick={()=>{
              openModal()
              setFancyRunPostioin(checkScorePostion? item?.scorePostion:[])
              }} style={{cursor:"pointer"}}>

            {checkScorePostion?.length && <CustomIcon/>}
            </span>
            </div> 
          <span style={{ color: findSelectionId[0] > 0 ? "green" : "red",display:"block" }}>{findSelectionId}</span>
          </div>
          <div className="odds-row-right-col relative grid grid-cols-2 md:grid-cols-3" onClick={()=>{
            setCheckFancy("fancy")
            fancyProfitLoss(fancyBetPlaceData?.stack, fancyBetPlaceData?.run, fancyBetPlaceData?.is_back, item?.SelectionId,collapseName ,item?.minStack,item?.maxStack)
          }}>
           
                <DetailOdds display={"none"}/>
                <DetailOdds display={"none"}/>
                <DetailOdds bg={
                        item?.LaySize1 > prevFancy[index]?.LaySize1
                          ? "odds-up-color"
                          : item?.LaySize1 < prevFancy[index]?.LaySize1
                          ? "odds-down-color"
                          : ""
                      } fancy={true} fancyId={item?.SelectionId}  index={index} matchName={item?.RunnerName} lay={0} marketId={odddata?.market_id} betPlaceHandler={betPlaceHandler} item={oddsColor[3]} key={item?.selectionName} price={item?.LaySize1} value={item?.LayPrice1} height={44} border={true} fun={fun} fancyStatus={item?.fancyStatus}/>
                <DetailOdds fancy={true}
                 bg={
                  item?.BackSize1 > prevFancy[index]?.BackSize1
                    ? "odds-up-color"
                    : item?.BackSize1 < prevFancy[index]?.BackSize1
                    ? "odds-down-color"
                    : ""
                } fancyId={item?.SelectionId} index={index} matchName={item?.RunnerName} lay={1} marketId={odddata?.market_id} betPlaceHandler={betPlaceHandler} item={oddsColor[0]} key={item?.selectionName} price={item?.BackSize1} value={item?.BackPrice1} height={44} border={true} fun={fun} fancyStatus={item?.fancyStatus}/>
                <DetailOdds display={"none"}/>
                <DetailOdds display={"none"}/>
            <div className="fancy-min-max">
              <span>Min:{item?.minStack}</span>
              <span>Max:{item?.maxStack}</span>
            </div>
            
            {item?.adminMessage == "BET SUSPENDED"|| item?.inplayStatus === "SUSPENDED"  || item?.inplayStatus === "CLOSE" || item?.inplayStatus === "Ball Running" ?
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
    </>

  )
};

export default FancyDetailCollapse;

