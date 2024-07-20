import styled from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;

  padding: 0px;
  background:#2d689b;
  ::-webkit-scrollbar {
    display: none;
  }
  .left-slider-btn {
    width:8%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-image: linear-gradient(to right, #0088cc82, #cccccc);
    svg {
      color: white;
      font-size: 19px;
      position:absolute;
      z-index:1;
      color:black;
    }
    &::after {
      position: absolute;
      width: 66px;
      content: "";
      left: 0px;
      background-image: linear-gradient(to right, #0088cc82);
      /* background-color: red; */
      height: 100%;
    
    }
  }
  .right-slider-btn {
    width: 8%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #cccccc, #0088cc82);
    svg {
      color: white;
      font-size: 19px;
      position:absolute;
      z-index:1;
      cursor: pointer;
      color:black;
    }
    &::after {
      position: absolute;
      width: 66px;
      content: "";
      right: 0px;
      /* background-color: red; */
      height: 100%;
      cursor: pointer;
     
    }
  }
  .middle-slider-data {
    /* width: 90%; */
    overflow-x: scroll;
    display: flex;
    // gap: 10px;
    margin-block:2px;
    flex-grow: 1;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const BoxCard = styled.div`
  background-color: ${(props) =>
    props.isSelected ? `#0088CC` : ``};
  height: 32px;
  width: auto;
  display: flex;

  align-items: center;
  justify-content: center;
     padding: .375rem 1.25rem;
 border-radius: 12px;
  white-space: nowrap;
  transition: all 0.2s linear;


  cursor: pointer;
  p {
    font-size: 12px;
    color: ${(props) => (props.isSelected ? `white` : `white`)};
  }

  /* .boxCard {
    background-color: rgb(255 248 248 / 29%);
  }

  & .active {
    background-color: white !important;
    color: white;
  } */
`;
