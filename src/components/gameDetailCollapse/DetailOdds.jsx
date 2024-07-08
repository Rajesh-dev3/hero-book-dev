import React from "react";

const DetailOdds = ({item,value,price,height,border,fun,index}) => {
  
  return (
  


    <div className={`market-odd-box ${item}`} key={item} style={{minHeight:height,borderLeft:border? "1px solid #c7c8ca":"",}}
    onClick={()=>index == 2 ? fun(true): index == 3 && fun(true)}>
      <span className="market-odd">{value !=0?value:"--"}</span>
      <span className="market-volume">{price !=0?price:"--"}</span>
    </div>
  
  
  );
};

export default DetailOdds;
