import DatePicker from "react-datepicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./styles.scss"
import { MenuItem, Select } from "@mui/material";
const Filter = ({ setStartDate, startDate, setEnddate, endDate, fun, setLimit }) => {



  return (
    <div className="statement-form">
      <div className="date-filter-row flex gap-[6px] md:gap-4">
        <div className="date-picker">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showIcon
            calendarIconClassname="calnder"
            icon={<CalendarTodayIcon />}
          />
        </div>
        {/* <div className="date-picker">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEnddate(date)}
            showIcon
            calendarIconClassname="calnder"
            icon={<CalendarTodayIcon />}
          />
        </div> */}
  <div className="select-menu w-full md:w-[15%]">
          {/* <select className="px-[2] py-[5] border-[1px] border-[#dbdbdb] w-full h-[38px] rounded-[5px]"
            onChange={(e) => setFormData((prev) => {
              return {
                ...prev, sport_id: e.target.value
              }
            })}>
            <option value="0" disabled>
              <b>Select Report Type</b>
            </option>
            <option value={0}>All</option>
            <option value={0}>All</option>
            <option value={0}>All</option>
            <option value={0}>All</option>
            {[]?.map((item) => {
              return (

                <option value={item?.sport_id} key={item?.sport_id}>{item?.name}</option>
              )
            })}
          </select> */}
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            IconComponent={KeyboardArrowDownIcon} 
            sx={{ width: "100%", height: "38px", outline: "none", borderRadius:"0" }}
            // onChange={handleChange}
            defaultValue={""}
          >
            <MenuItem value="" disabled>Select Log Type </MenuItem>
            <MenuItem value={10}>Login</MenuItem>
            <MenuItem value={20}>Change Password</MenuItem>
           
          </Select>
        </div>
        <div className="form-btn">
          <button className="btn" onClick={fun}>Submit</button>
        </div>
      </div>
      <div className="entries-row w-full flex justify-between mt-3">
        <div className="entries-left-col w-[50%] flex items-center gap-2">
          <span>Show</span>
          {/* <select onChange={(e) => setLimit(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select> */}
           <Select
             
             labelId="demo-simple-select-label"
             id="demo-simple-select"
            //  value={formData.limit} // Ensure formData.limit is set initially
            //  onChange={(e) => setFormData((prev) => ({
            //    ...prev, limit: e.target.value
            //  }))}
             displayEmpty
             inputProps={{ 'aria-label': 'Limit' }}
           defaultValue={"10"}
             IconComponent={KeyboardArrowDownIcon} 
             sx={{ height: "38px", outline: "none", borderRadius:"0" }}
           >
             <MenuItem value={10}>10</MenuItem>
             <MenuItem value={20}>20</MenuItem>
             <MenuItem value={30}>30</MenuItem>
             <MenuItem value={40}>40</MenuItem>
            
           </Select>
          <span>Entries</span>
        </div>
        <div className="entries-right-col w-[50%] flex justify-end items-center gap-[0.5rem]">
          Search:
          <input
            placeholder="search..."
            className="w-[20%] border-[1px] border-[#ced4da] rounded-[3px] h-[38px] p-[5px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
