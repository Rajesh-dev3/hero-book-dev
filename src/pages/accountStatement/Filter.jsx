import DatePicker from "react-datepicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomSelect } from "./styled";
const Filter = ({ setStartDate, startDate, setEnddate, endDate, fun, setLimit }) => {



  return (
    <div className="statement-form">
      <div className="date-filter-row flex">
        <div className="date-picker">
          <DatePicker
            selected={startDate}
            className="date-picker-a input-s"
            onChange={(date) => setStartDate(date)}
            showIcon
            calendarIconClassname="calnder"
            
            icon={<CalendarTodayIcon />}
          />
        </div>
        <div className="date-picker">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEnddate(date)}
            showIcon
            className="input-s"
            calendarIconClassname="calnder"
            icon={<CalendarTodayIcon />}
          />
        </div>
        {/* <div className="select">
          <Select
    
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      displayEmpty
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
          padding: '0px', // Removes padding from the dropdown icon
        },
      }}
      defaultValue={""}
    >
      
            <MenuItem value="" disabled>All Reports </MenuItem>
            <MenuItem value={"Deposite/Withdraw Reports"}>Deposite/Withdraw Reports</MenuItem>
            <MenuItem value={"Game Reports"}>Game Reports</MenuItem>
           
          </Select>
        </div> */}
        <div className="form-btn">
          <button className="btn" onClick={fun}>Submit</button>
        </div>
      </div>
      <div className="entries-row w-full flex justify-between mt-[6px]">
        <div className="entries-left-col w-[50%] flex items-center gap-2">
          <span>Show</span>
          {/* <select onChange={(e) => setLimit(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select> */}
             <CustomSelect
             
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setLimit(e.target.value)}
            defaultValue={10}
            sx={{borderRadius:"0"}}

            IconComponent={KeyboardArrowDownIcon} 
            
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
           
          </CustomSelect>
          <span>Entries</span>
        </div>
        <div className="entries-right-col   flex justify-end items-center gap-[0.5rem]">
      <span>Search:</span>
      <input
        placeholder="0 records..."
        className="border border-[#ced4da] h-[38px] p-[5px] font-Roboto Condensed"
      />
    </div>
      </div>
    </div>
  );
};

export default Filter;
