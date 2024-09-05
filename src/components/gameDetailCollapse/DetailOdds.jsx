
const DetailOdds = ({prevOddRunners,visiblePrice,visible, selectionId, fancy, fancyId, fancyStatus, marketId, matchName, lay, item, value, price, height, border, fun, index, display, betPlaceHandler }) => {
  let oddsValue = value != 0 && value != null ? value : "--"
  let oddsPrice = price != 0  && price != null  ?  price : "--"
  console.log(prevOddRunners?.price , oddsValue,"prevOddRunners")


 let bg=
    (oddsValue > prevOddRunners?.price
      ? "odds-up-color"
      : oddsValue < prevOddRunners?.price
      ? "odds-down-color"
      : "")
  
  return (
    <div className={`${bg} ${visible && "invisible" }  market-odd-box ${item}`} key={item} style={{ display: display, minHeight: height, borderLeft: border ? "1px solid #c7c8ca" : "", }}
      onClick={() => {
        const oddPlaceData = { selection_id: selectionId, is_back: String(lay), odds: String(value), matchName: matchName, market_id: marketId }

        const fancyPlaceBetData = { is_back: String(lay), run: String(value), size: String(price), matchName: matchName, fancyStatus: fancyStatus, fancy_id: fancyId }
        // betPlaceHandler(fancy?fancyPlaceBetData:oddPlaceData)
        betPlaceHandler(fancy ? fancyPlaceBetData : oddPlaceData)

        index == 0 || fancy ? fun(true) : ""
      }}>
      <span className="market-odd">{oddsValue}</span>
      <span className={`${visiblePrice && "hidden"} market-volume`}>{oddsPrice}</span>
    </div>


  );
};

export default DetailOdds;
