
const DetailOdds = ({profithandler,selectionId,fancy,fancyId,fancyStatus,marketId,matchName,lay,item,value,price,height,border,fun,index,display,betPlaceHandler}) => {
  return (
    <div className={`market-odd-box ${item}`} key={item} style={{display:display,minHeight:height,borderLeft:border? "1px solid #c7c8ca":"",}}
    onClick={()=>{
      profithandler()
      const oddPlaceData = {selection_id:selectionId,is_back:String(lay),odds:String(value),matchName:matchName,market_id:marketId}

      const fancyPlaceBetData = {is_back:String(lay), run: String(value),size: String(price),matchName:matchName,fancyStatus:fancyStatus,fancy_id:fancyId }
      // betPlaceHandler(fancy?fancyPlaceBetData:oddPlaceData)
      betPlaceHandler(fancy?fancyPlaceBetData:oddPlaceData)

      index == 0  || fancy ? fun(true):""
      }}>
      <span className="market-odd">{value !=0?value:"--"}</span>
      <span className="market-volume">{price !=0?price:"--"}</span>
    </div>
  
  
  );
};

export default DetailOdds;
