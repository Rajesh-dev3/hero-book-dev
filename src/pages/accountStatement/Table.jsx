import moment from "moment";

const Table = ({ data }) => {
  return (
    <div className="mt-2">
      <table role="table" className="table-bordered table-striped bg-[#f7f7f7] text-[#333] w-full">
        <thead className="border-[#c7c8ca] border-[1px] ">
          <tr role="row">
            <th className="w-[20%] px-[12px] py-[6px] text-left border-[1px]">
              Date
            </th>
            <th className="border-[1px] text-end w-[10%] px-[12px] py-[6px]">
              Sr no
            </th>
            <th


              className="border-[1px] text-end w-[10%] px-[12px] py-[6px]"
            >
              Credit
            </th>
            <th


              className="border-[1px] text-end px-[12px] py-[6px] w-[10%]"
            >
              Debit
            </th>
            <th


              className="border-[1px] text-end px-[12px] py-[6px] w-[10%]"
            >
              Pts
            </th>
            <th className="border-[1px] text-left px-[12px] py-[6px]">
              Remark
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
              <td role="cell" className="border-[1px] px-[8px] py-[5px] text-end"><span role="cell" className={item?.amount>0?"green-color":"red-color"}>{item?.amount}</span></td>
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
