

const OddsRowHeading = () => {
  return (
    <div className="odds-row-container odd-row-header w-full flex justify-between gap-4 pb-[4px] pt-[4px]">
      <div className="odds-row-left-col w-[69%] flex justify-between  items-center">
        <span className="text-[14px] font-bold ">Game</span>
        <div className="icon-div flex
          items-center
          gap-[10px]">

        </div>
      </div>
      <div className="odds-row-right-col w-[40%] md:w-[100%] sm:w-[100%]">
        <ul className="w-full grid grid-cols-3 text-center ">
          <li className="w-full grid grid-cols-1 font-bold text-[14px]">1</li>
          <li className="w-full grid grid-cols-1 font-bold text-[14px]">X</li> <li className="w-full grid grid-cols-1 font-bold text-[14px]">2</li>
        </ul>
      </div>
    </div>
  )
}

export default OddsRowHeading