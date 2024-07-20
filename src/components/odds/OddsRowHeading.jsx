

const OddsRowHeading = () => {
  return (
    <div className="odds-row-container odd-row-header w-full flex justify-between gap-4">
      <div className="odds-row-left-col w-[60%] flex justify-between pl-2 items-center">
        <span className="text-[14px]">Game</span>
        <div className="icon-div flex
          items-center
          gap-[10px]">

        </div>
      </div>
      <div className="odds-row-right-col w-[40%] md:w-[100%] sm:w-[100%]">
        <ul className="w-full grid grid-cols-3 text-center ">
          <li className="w-full grid grid-cols-1">1</li>
          <li className="w-full grid grid-cols-1">x</li> <li className="w-full grid grid-cols-1">2</li>
        </ul>
      </div>
    </div>
  )
}

export default OddsRowHeading