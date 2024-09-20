

import './styles.scss'

const Filter = ({ allBack,setAllBack}) => {



  return (
    <div className="activity-log-form">
       <div className="all-back-lay mt-[5px] md:mt-[0px] sm:mt-[5px]  flex items-center gap-4 justify-start">
          <div className="flex gap-1 items-center">
            <input
              type="radio"
              name="Matched"
              value="30"
              checked={allBack == "All"}
              onChange={()=>setAllBack("All")}
              className="w-[15px]  radio-input"
            />

            <label>Matched</label>
          </div>
          <div className="flex gap-1 ">
            <input
              type="radio"
              name="Un-Matched"
              value="60"
              checked={allBack == "Back"}
              onChange={()=>setAllBack("Back")}
              className="w-[15px] radio-input"
            />

            <label>Un-Matched</label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              name="Deleted"
              value="100"
              checked={allBack == "Lay"}
              onChange={()=>setAllBack("Lay")}
              className="w-[15px] radio-input"
            />

            <label>Deleted</label>
          </div>
        </div>
    </div>
  );
};

export default Filter;
