
const Table = ({data}) => {
  return (
    <div className="mt-2">
      <table role="table" className="table-bordered table-striped bg-[#f7f7f7] text-[#333] w-full">
        <thead className="border-[#c7c8ca] border-[1px] ">
          <tr role="row">
            <th   className="w-[20%] px-[12px] py-[6px] text-left border-[1px]">
            DESCRIPTION
            </th>
            <th   className="border-[1px] text-end w-[10%] px-[12px] py-[6px]">
            MARKET
            </th>
            <th
              
              
              className="border-[1px] text-end w-[10%] px-[12px] py-[6px]"
            >
              SIDE
            </th>
            <th
              
              
              className="border-[1px] text-end px-[12px] py-[6px] w-[10%]"
            >
              ODDS
            </th>
            <th
              
              
              className="border-[1px] text-left px-[12px] py-[6px] w-[10%]"
            >
              STACK
            </th>
            <th  className="border-[1px] text-left px-[12px] py-[6px]">
            PROFIL/LOSS
            </th>
            <th  className="border-[1px] text-left px-[12px] py-[6px]">
            STATUS
            </th>
            <th  className="border-[1px] text-left px-[12px] py-[6px]">
            IP ADDRESS
            </th>
          </tr>
        </thead>
        {data?.map((item,index)=>{
          return(

        <tr role="row" key={index}>
          <td role="cell" className="border-[1px] px-[8px] py-[5px]">{item?.created_at}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end">{item?.marketName}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">{item?.amount}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">{item?.Odds}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">{item?.Stack}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.PotentialProfit}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.description}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.ipAddress}</td>
        </tr>
          )
        })}
      </table>
    </div>
  );
};

export default Table;
