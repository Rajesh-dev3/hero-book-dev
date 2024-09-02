import * as styled from "./FilterSlider.style";
const SlideBox = ({itemRefs,handleItemClick,data,activeValue,setActiveValue}) => {


  return (
    <>
      {data?.map((res, index) => {
        return (
          <styled.BoxCard
           key={res.casinoType}
           
           ref={(el) => itemRefs.current[index] = el}
            isSelected={activeValue === res?.link}
            // className={activeValue === index ? "active" : "boxCard"}
            onClick={() =>{
              handleItemClick(index)
              setActiveValue(res?.link)
            } 
          }
          >
            <p>{res?.casinoType}</p>
          </styled.BoxCard>
        );
      })}
    </>

  );
};

export default SlideBox;
