// import React from 'react'

// const ActivityLog = () => {
//   return (
//     <div>ActivityLog</div>
//   )
// }

// export default ActivityLog


import {  useEffect, useState } from "react"
import Filter from "./Filter"
import Table from "./Table"
import moment from "moment"
import PagesTitle from "../../components/pagesTitle/PagesTitle"
import { useActivityLogMutation } from "../../services/activityLog/activityLog"

///styles
import "./styles.scss"
const ActivityLog = () => {
  const [limit, setLimit] = useState(10)
  const [startDate, setStartDate] = useState(moment().subtract(6, 'days').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [activityLogs, setActivityLogs] = useState([]);

  // Use RTK Query mutation hook
  const [fetchActivityLogs, {data, isLoading, error }] = useActivityLogMutation();

  const submitHandler = async () => {
   

      // Fetch data
    
  };
  useEffect(() => {
    fetchActivityLogs( {
     "user_name":"aakash07"
 
  })
  }, [])
  
console.log(data ,"kaka")
  return (
    <div className='shadow-container'>
      <PagesTitle title={"Activity Log"} />
      <div className="statement-body p-[10px]">
        <Filter fun={submitHandler} setLimit={setLimit} setStartDate={setStartDate} startDate={startDate} endDate={endDate} setEnddate={setEndDate} />
        <div className="account-table">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
          <Table data={data?.data} />
        
        </div>
      </div>
    </div>
  )
}

export default ActivityLog