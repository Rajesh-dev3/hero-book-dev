import moment from "moment";

const Table = ({ data }) => {
  return (
    <div className="mt-2">
      <table role="table" className="table-bordered table-striped bg-[#f7f7f7] text-[#333] w-full">
        <thead className="border-[#c7c8ca] border-[1px] ">
          <tr role="row">
            <th className="w-[12%] px-[12px] py-[6px] border-[1px]">
              Username
            </th>
            <th className="border-[1px] w-[10%] px-[12px] py-[6px]">
              Date
            </th>
            <th


              className="border-[1px] w-[10%] px-[12px] py-[6px]"
            >
              IP Address
            </th>
          
         
          </tr>
        </thead>
        {data?.data?.map((item, index) => {
          return (

            <tr role="row" key={index}>
              <td role="cell" className="border-[1px] px-[8px] py-[5px]"> {
                moment(
                  parseInt(
                    item && item.created_at ? item.created_at : null,
                  ) * 1000,
                )
                  .utcOffset("+05:30")
                  .format("DD/MM/YYYY HH:mm:a")}</td>
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end">{index + 1}</td>
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">{item?.amount}</span></td>
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">-</span></td>
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className="">{item?.available_balance}</span></td>
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-left">{item?.description}</td></tr>
          )
        })}
      </table>
    </div>
  );
};

export default Table;
