import "./styles.scss";
import DetailOdds from "./DetailOdds";

function convertToKOrLakh(number) {
  if (number >= 100000) {
    return (number / 100000).toFixed(0) + "L";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + "k";
  } else {
    return number.toString();
  }
}

const GameDetailCollapse = ({
  checkBookmaker,
  setBookMaker,
  prevOdd,
  min,
  setCheckFancy,
  checkFancy,
  profithandler,
  setSelectionId,
  profitLoss,
  betPlaceData,
  fun,
  odddata,
  collapseName,
  betPlaceHandler
}) => {
  const oddsColor = ["back", "back1", "back2", "lay", "lay1", "lay2"];
  if (collapseName !== "To Win the Toss") {
    return (
      <div className="game-market market-4">
        <div className="market-title">
          <span>{collapseName}</span>
        </div>
        <div className="market-header2" >
          <div className="odds-row-container flex items-center detail-row">
            <div className="odds-row-left-col remove-top-border px-[5px]">
              <p>
                {min && `Min: ${convertToKOrLakh(odddata?.marketMinStack)}`} Max: {convertToKOrLakh(odddata?.marketMaxStack)}
              </p>
            </div>
            <div className="odds-row-right-col grid grid-cols-6">
              <DetailOdds height={28} visible={true} />
              <DetailOdds height={28} visible={true} />
              <DetailOdds height={28} value={"Back"} item={oddsColor[0]} visiblePrice={true} />
              <DetailOdds height={28} value={"Lay"} item={oddsColor[3]} visiblePrice={true} />
              <DetailOdds height={28} visible={true} />
              <DetailOdds height={28} visible={true} />
            </div>
          </div>
        </div>
        {odddata?.runner_json?.map((list, ind) => {

          const findFancySelection = !checkFancy
            ? profitLoss?.find(elm => elm?.marketId == odddata?.market_id && elm.selectionId === list?.selectionId)?.winLoss || 0
            : 0;
            const displayValue = (findFancySelection + (list?.WinAndLoss || 0)).toFixed(2);
         
          
          return (
            <div className="odds-row-container flex items-center detail-row" key={list?.selectionName}>
              <div className="odds-row-left-col px-[5px] remove-top-border">
                {list?.selectionName}
                <span
                  style={{ color: displayValue > 0 ? "green" : "red" }}
                  className="profit-loss"
                >
                  {displayValue != 0 ? displayValue :""}
                </span>
              </div>

              <div
                className="odds-row-right-col grid grid-cols-6 relative"
                onClick={() => {
                  if (collapseName === "Bookmaker") {
                    setBookMaker(checkBookmaker + 1);
                  }
                  setCheckFancy(checkFancy);
                  setSelectionId(odddata);
                  profithandler(betPlaceData?.stack, betPlaceData?.odds, betPlaceData?.is_back, odddata);
                }}
              >
                {list?.ex?.availableToBack.map((item, index) => {
                  const prevOddRunners = prevOdd?.runner_json[ind]?.ex?.availableToBack[index];
                  return (
                    <DetailOdds
                      key={item?.selectionName}
                      bg={
                        item?.price > prevOddRunners?.price
                          ? "odds-up-color"
                          : item?.price < prevOddRunners?.price
                          ? "odds-down-color"
                          : ""
                      }
                      profithandler={profithandler}
                      selectionId={list?.selectionId}
                      marketId={odddata?.market_id}
                      matchName={list?.selectionName}
                      lay={1}
                      betPlaceHandler={betPlaceHandler}
                      index={index}
                      item={oddsColor[index]}
                      value={item?.price}
                      price={item?.size}
                      height={44}
                      border={true}
                      fun={fun}
                    />
                  );
                }).reverse()}

                {list?.ex?.availableToLay.map((item, index) => {
                  const prevOddRunners = prevOdd?.runner_json[ind]?.ex?.availableToLay[index];
                  return (
                    <DetailOdds
                      key={item?.selectionName}
                      bg={
                        item?.price > prevOddRunners?.price
                          ? "odds-up-color"
                          : item?.price < prevOddRunners?.price
                          ? "odds-down-color"
                          : ""
                      }
                      profithandler={profithandler}
                      selectionId={list?.selectionId}
                      matchName={list?.selectionName}
                      lay={0}
                      betPlaceHandler={betPlaceHandler}
                      index={index}
                      item={oddsColor[index + 3]}
                      value={item?.price}
                      price={item?.size}
                      height={44}
                      border={true}
                      fun={fun}
                    />
                  );
                })}

                {(list?.GameStatus === "SUSPENDED" || odddata?.InplayStatus === "CLOSE") && (
                  <div className="suspend absolute w-full h-full text-[red] font-bold flex items-center justify-center">
                    Suspended
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default GameDetailCollapse;
