
const Table = ({data}) => {
  return (
    <div className="mt-2">
      <table role="table" className="table-bordered table-striped  w-full">
        <thead className="border-[#c7c8ca] border-[1px] ">
          <tr role="row">
            <th   className="w-[20%] px-[12px] py-[6px] text-left border-[1px]">
            DESCRIPTION
            </th>
            <th   className="w-[20%] border-[1px]  px-[12px] py-[6px]">
            MARKET
            </th>
            <th
              
              
              className="border-[1px] w-[10%] px-[12px] py-[6px]"
            >
              SIDE
            </th>
            <th
              
              
              className="border-[1px] px-[12px] py-[6px] w-[10%]"
            >
              ODDS
            </th>
            <th
              
              
              className="border-[1px] text-end px-[12px] py-[6px] w-[10%]"
            >
              STACK
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            PROFIL/LOSS
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            STATUS
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            IP ADDRESS
            </th>
          </tr>
        </thead>
        {data?.map((item,index)=>{
          return(

        <tr role="row" key={index} style={{background:item?.Type == "Back" ? "#72bbef":"#faa9ba"}}>
          <td role="cell" className="border-[1px] px-[8px] py-[5px]">{item?.seriesName + " "+ item?.marketName}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center">{`${item?.marketName} -- ${item?.seriesName}`}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.Type}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.Odds}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.Stack}</span></td>
        <td role="cell" className={`border-[1px] px-[8px] py-[5px] text-left ${item?.PotentialProfit>0?"green-color":"red-color"}`}>{item?.PotentialProfit}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.PotentialProfit > 0 ? "WON" : "LOSS"}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.ipAddress}</td>
        </tr>
          )
        })}
      </table>
    </div>
  );
};

export default Table;
