
////style
import "./styles.scss"
import DetailOdds from "./DetailOdds";
const GameDetailCollapse = ({fun,odddata,collapseName}) => {
  const oddsColor = ["back","back1","back2","lay","lay1","lay2"]
 
  return (
    <div className="game-market market-4 ">
      <div className="market-title">
        <span>{collapseName}</span>
      </div>
      <div className="market-header">
      
      <div className="odds-row-container flex items-center" >
        <div className="odds-row-left-col px-[5px]">
         <p>
           Max:1
          </p>
           </div>
        <div className="odds-row-right-col grid grid-cols-6">
          <DetailOdds height={28}/>
          <DetailOdds height={28}/>
          <DetailOdds height={28} value={"Back"} item={oddsColor[0]}/>
          <DetailOdds height={28} value={"Lay"}  item={oddsColor[3]}/>
          <DetailOdds height={28}/>
          <DetailOdds height={28}/>
         
        </div>
      </div>
      </div>
      {odddata?.runner_json?.map((item,index)=>{
        return(

          <div className="odds-row-container flex items-center" key={item}>
          <div className="odds-row-left-col px-[5px]">{item?.selectionName}</div>
          <div className="odds-row-right-col grid grid-cols-6 relative">
            {item?.ex?.availableToBack.map((item,index)=>
            {
              return(
  
                <DetailOdds index={index} item={oddsColor[index]} key={item} value={item?.price} price={item?.size} height={44} border={true} fun={fun}/>
              )
            }).reverse()}
             {item?.ex?.availableToLay.map((item,index)=>
            {
              return(
  
                <DetailOdds index={index} item={oddsColor[index+3]} key={item}  value={item?.price} price={item?.size} height={44} border={true} fun={fun}/>
              )
            })}
            {item?.GameStatus === "SUSPENDED" && 
           <div className="suspend absolute w-full h-full text-[red] font-bold flex items-center justify-center">
            Suspended
           </div>
          }
          </div>
        </div>
        )
      })}
     
     
    </div>
  )
};

export default GameDetailCollapse;
