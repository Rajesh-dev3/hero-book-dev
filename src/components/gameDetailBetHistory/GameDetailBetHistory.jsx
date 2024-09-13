
////styles
import "./styles.scss"

const GameDetailBetHistory = ({data}) => {

  
  

 
 
  return (
    <div className="sidebar-box my-bet-container">
    <div className="sidebar-title">
      <h4>My Bet</h4>
    </div>
    <div className="my-bets">
      <div className="table-responsive w-100">
        <table className="table">
        <thead><tr className='text-left'><th>Matched Bet</th><th className="text-center">Type</th><th className="text-center">Odds</th><th className="text-center">Stake</th><th className="text-center">P/L</th></tr></thead>
     
          <tbody>
            {data?.map((item)=>{
              return(

            <tr key={item?.marketName+item?.market_id}><td className={`text-left pl-[5px] ${item?.is_back ==1?"back":"lay"}`}>{item?.selectionName || item?.fancy_name}</td>
            <td className={`text-center ${item?.is_back ==1?"back":"lay"}`}>{item?.is_back ==1?"Back":"Lay"}</td>
            <td className={`text-center ${item?.is_back ==1?"back":"lay"}`}>{item?.odds || item?.run}</td>
            <td className={`text-center ${item?.is_back ==1?"back":"lay"}`}>{item?.stack}</td>
            <td className={`text-center ${item?.is_back ==1?"back":"lay"}`}>{item?.p_l || item?.profit}</td>
            </tr>
              )
            })}
    
            </tbody>
       
        </table>
      </div>
    </div>
  </div>
  )
}

export default GameDetailBetHistory