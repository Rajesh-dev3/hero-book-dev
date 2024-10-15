import moment from "moment";

const Table = ({data}) => {
  return (
    <div className="mt-2">
      <table role="table" className="table-bordered table-striped bg-[#f7f7f7] text-[#333] w-full">
        <thead className="border-[#c7c8ca] border-[1px] ">
          <tr role="row">
            <th   className="w-[20%] px-[12px] py-[6px] text-left border-[1px]">
            S.No
            </th>
            <th   className="w-[20%] border-[1px]  px-[12px] py-[6px]">
            Event Name
            </th>
            <th
              
              
              className="border-[1px] w-[10%] px-[12px] py-[6px]"
            >
              Nation
            </th>
            <th
              
              
              className="border-[1px] px-[12px] py-[6px] w-[10%]"
            >
              Event Type
            </th>
            <th
              
              
              className="border-[1px] text-end px-[12px] py-[6px] w-[10%]"
            >
              Market Name
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            Side
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            Rate
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            Amount
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            Place Date
            </th>
            <th  className="border-[1px] text-end px-[12px] py-[6px]">
            Match Date
            </th>
          </tr>
        </thead>
        {data?.map((item,index)=>{
           const date = moment(
            parseInt(
              item?.place_date && item?.place_date ? item?.place_date : null,
            ) * 1000,
          )
            .utcOffset("+05:30")
            .format("DD/MM/YYYY HH:mm:ss ")
          return(
        <tr role="row" key={index} style={{background:item?.side == "BACK" ? "#72bbef":"#faa9ba"}}>
          <td role="cell" className="border-[1px] px-[8px] py-[5px]">{index+1}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center">{item?.event_name}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.nation}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.event_type}</span></td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center"><span role="cell" className="">{item?.market_name}</span></td>
        <td role="cell" className={`border-[1px] px-[8px] py-[5px] text-left `}>{item?.side}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.rate}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.amount}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{date}</td>
        <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.match_date}</td>
        </tr>
          )
        })}
      </table>
    </div>
  );
};

export default Table;
