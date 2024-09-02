
const Table = ({data}) => {
    return (
      <div className="mt-2">
        <table role="table" className="table-bordered table-striped bg-[#f7f7f7] text-[#333] w-full">
          <thead className="border-[#c7c8ca] border-[1px] ">
            <tr role="row">
              <th   className="w-[2%] px-[12px] py-[6px] text-left border-[1px]">
              Round ID
              </th>
              <th   className="w-[20%] border-[1px] text-start px-[12px] py-[6px]">
              Winner
              </th>
            
            </tr>
          </thead>
          {data?.map((item,index)=>{
            return(
  
          <tr role="row" key={index}>
            <td role="cell" className="border-[1px] px-[8px] py-[5px]">{item?.roundId}</td>
            
          <td role="cell" className="border-[1px] px-[8px] py-[5px] text-center">{item?.user_name}</td>

          </tr>
            )
          })}
        </table>
      </div>
    );
  };
  
  export default Table;
  