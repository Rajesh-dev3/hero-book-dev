import  { Fragment } from "react";
import * as styled from "./FilterSlider.style";
const SlideBox = ({data,activeValue,setActiveValue}) => {

  return (
    <Fragment>
      {data?.map((res, index) => {
        return (
          <styled.BoxCard
           key={res.casinoType}
            isSelected={activeValue === res?.link}
            // className={activeValue === index ? "active" : "boxCard"}
            onClick={() =>{
              setActiveValue(res?.link)
            } 
          }
          >
            <p>{res?.casinoType}</p>
          </styled.BoxCard>
        );
      })}
    </Fragment>
  );
};

export default SlideBox;
