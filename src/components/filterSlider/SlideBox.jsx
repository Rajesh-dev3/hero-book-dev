import { useLocation, useNavigate } from "react-router-dom";
import * as styled from "./FilterSlider.style";

const SlideBox = ({ itemRefs, handleItemClick, data, activeValue, setActiveValue }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Determine the active link based on pathname
  const activeLink = pathname?.split("/")[2];

  const handleClick = (link, index) => {
    setActiveValue(link); // Update active value
    handleItemClick(index); // Handle the item click
    navigate(`/casino/${link}`); // Update the URL
  };

  return (
    <>
      {data?.map((res, index) => {
        // Determine if the current item is active
        const isActive = activeLink === res?.link;

        return (
          <styled.BoxCard
            key={res.casinoType}
            ref={(el) => itemRefs.current[index] = el}
            isSelected={isActive}
            onClick={() => handleClick(res?.link, index)}
          >
            <p>{res?.casinoType}</p>
          </styled.BoxCard>
        );
      })}
    </>
  );
};

export default SlideBox;
