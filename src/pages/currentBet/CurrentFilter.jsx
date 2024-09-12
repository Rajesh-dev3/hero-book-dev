import { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useGetSportListMutation } from "../../services/sport/sportList"
///styles
import "./styles.scss";
import { MenuItem, Select } from "@mui/material";
import { CustomSelect } from "./styled";
const Filter = ({allBack, setAllBack,startDate, endDate, formData, setFormData, setEndDate, setStartDate, submitHandler }) => {

  const [trigger, { data }] = useGetSportListMutation()

  useEffect(() => {
    trigger({ "limit": 50, "pageno": 1 })
  }, [])

  
  return (
   
    <div className="current-bet-form">
      <div className="select-area w-full flex">

        {/* <div className="select-menu w-[15%]">
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
        </div> */}
        <div className="select-menu w-[15%]">
          {/* <select className="px-[2] py-[5] border-[1px] border-[#dbdbdb] w-full h-[38px]"
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
          </select> */}
 <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            className="input-s"
            IconComponent={KeyboardArrowDownIcon} 
            sx={{
              width: '100%',
              height: '38px',
              outline: 'none',
              borderRadius: '0',
              fontFamily: 'Roboto Condensed',
              '& .MuiSelect-select': {
                paddingLeft: '5px', // Removes padding from the select input
                
              },
              '& .MuiSelect-icon': {
                fontSize:'25px',
                padding: '2px',
                // paddingTop:"1px" // Removes padding from the dropdown icon
              },
            }}
            // onChange={handleChange}
            defaultValue={""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sport_id: e.target.value,
              }))
            }
          >
            <MenuItem value="" disabled>Select Report Type</MenuItem>
            {data?.data?.map((item) => (
          <MenuItem value={item?.sport_id} key={item?.sport_id}>
            {item?.name}
          </MenuItem>
        ))}
          </Select>


        </div>
        <div className="form-btn">
          <button className="btn" onClick={submitHandler}>Submit</button>
        </div>
      </div>
      <div className="entries-container flex">
        <div className="entries flex items-center  gap-2">
          <span>Show</span>
          {/* <select className="border-[1px] border-[#dbdbdb] w-[18%] h-[38px]"
            onChange={(e) => setFormData((prev) => {
              return {
                ...prev, limit: e.target.value
              }
            })}  >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select> */}
           <CustomSelect
             
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={formData.limit} // Ensure formData.limit is set initially
             onChange={(e) => setFormData((prev) => ({
               ...prev, limit: e.target.value
             }))}
             displayEmpty
             inputProps={{ 'aria-label': 'Limit' }}
           
             IconComponent={KeyboardArrowDownIcon} 
             sx={{borderRadius:"0"}}       >
             <MenuItem value={10}>10</MenuItem>
             <MenuItem value={20}>20</MenuItem>
             <MenuItem value={30}>30</MenuItem>
             <MenuItem value={40}>40</MenuItem>
            
           </CustomSelect>
          <span>Entries</span>
        </div>
        <div className="all-back-lay mt-[5px] md:mt-[0px] sm:mt-[5px]  flex items-center gap-4 justify-center">
          <div className="flex gap-1">
            <input
              type="radio"
              name="All"
              value="30"
              checked={allBack == "All"}
              onChange={()=>setAllBack("All")}
              className="w-[15px]  radio-input"
            />

            <label>All</label>
          </div>
          <div className="flex gap-1 ">
            <input
              type="radio"
              name="Back"
              value="60"
              checked={allBack == "Back"}
              onChange={()=>setAllBack("Back")}
              className="w-[15px] radio-input"
            />

            <label>Back</label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              name="Lay"
              value="100"
              checked={allBack == "Lay"}
              onChange={()=>setAllBack("Lay")}
              className="w-[15px] radio-input"
            />

            <label>Lay</label>
          </div>
        </div>
        <div className="soda-amount flex items-center justify-center md:justify-left ">
          Total Bets: 0 Total Amount: 0
        </div>
        <div className="search flex items-center justify-end gap-[10px]">
          Search:
          <input
            placeholder="0 records..."
            className="searchField border-[1px] border-[#ced4da] h-[38px] p-[5px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
