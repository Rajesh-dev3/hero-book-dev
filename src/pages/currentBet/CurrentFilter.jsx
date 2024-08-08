import { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker"
import { useGetSportListMutation } from "../../services/sport/sportList"
///styles
import "./styles.scss";
const Filter = ({ startDate, endDate, formData, setFormData, setEndDate, setStartDate, submitHandler }) => {

  const [trigger, { data }] = useGetSportListMutation()

  useEffect(() => {
    trigger({ "limit": 50, "pageno": 1 })
  }, [])
const [radioActive, setRadioActive] = useState(0)
  
  return (
   
    <div className="current-bet-form">
      <div className="select-area w-full flex gap-4">

        <div className="select-menu w-[15%]">
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showIcon

              calendarIconClassname="calnder"
              icon={<CalendarTodayIcon />}
            />
          </div>
        </div>
        <div className="select-menu w-[15%]">
          <div className="date-picker">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showIcon
              calendarIconClassname="calnder"
              icon={<CalendarTodayIcon />}
            />
          </div>
        </div>
        <div className="select-menu w-[15%]">
          <select className="px-[2] py-[5] border-[1px] border-[#dbdbdb] w-full h-[38px] rounded-[5px]"
            onChange={(e) => setFormData((prev) => {
              return {
                ...prev, sport_id: e.target.value
              }
            })}>
            <option value="0" disabled>
              <b>Select Report Type</b>
            </option>
            <option value={0}>All</option>
            {data?.data?.map((item) => {
              return (

                <option value={item?.sport_id} key={item?.sport_id}>{item?.name}</option>
              )
            })}
          </select>
        </div>
        <div className="form-btn">
          <button className="btn" onClick={submitHandler}>Submit</button>
        </div>
      </div>
      <div className="entries-container flex grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 mt-3 md:mt-10">
        <div className="entries flex items-center  gap-2">
          <span>Show</span>
          <select className="border-[1px] border-[#dbdbdb] w-[18%] h-[38px] rounded-[0px]"
            onChange={(e) => setFormData((prev) => {
              return {
                ...prev, limit: e.target.value
              }
            })}  >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          <span>Entries</span>
        </div>
        <div className="all-back-lay mt-[20px] md:mt-[0px] sm:mt-[10px]  flex items-center gap-4 justify-center md:justify-left">
          <div className="flex gap-1">
            <input
              type="radio"
              name="All"
              value="30"
              checked={radioActive == 0}
              onChange={()=>setRadioActive(0)}
              className="w-[15px]  radio-input"
            />

            <label>All</label>
          </div>
          <div className="flex gap-1 ">
            <input
              type="radio"
              name="Back"
              value="60"
              checked={radioActive == 1}
              onChange={()=>setRadioActive(1)}
              className="w-[15px] radio-input"
            />

            <label>Back</label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              name="Lay"
              value="100"
              checked={radioActive == 2}
              onChange={()=>setRadioActive(2)}
              className="w-[15px] radio-input"
            />

            <label>Lay</label>
          </div>
        </div>
        <div className="soda-amount flex items-center justify-center md:justify-left ">
          Total Bets: 0 Total Amount: 0
        </div>
        {/* <div className="search flex items-center justify-end gap-[10px]">
          Search:
          <input
            placeholder="search..."
            className="w-[50%]  border-[1px] border-[#ced4da] rounded-[3px] h-[38px] p-[5px]"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Filter;
