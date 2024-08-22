// import React from 'react'

// const ActivityLog = () => {
//   return (
//     <div>ActivityLog</div>
//   )
// }

// export default ActivityLog


import { useEffect, useState } from "react"
import { useAccountStatementMutation } from "../../services/accountStatement/accountStatement"
import Filter from "./Filter"
import Table from "./Table"
import moment from "moment"
import PagesTitle from "../../components/pagesTitle/PagesTitle"

///styles
import "./styles.scss"
const ActivityLog = () => {
  const [trigger, { data }] = useAccountStatementMutation()
  const [limit, setLimit] = useState(10)
  const [startDate, setStartDate] = useState(moment().subtract(6, 'days').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))


  let reqData = {
    "from_date": moment(startDate).startOf('day').unix(),
    "to_date": moment(endDate).endOf('day').unix(),
    "limit": limit,
    "pageno": 1
  }
  useEffect(() => {
    trigger(reqData)
  }, [])
  const submitHandler = () => {
    trigger(reqData)

  }

  return (
    <div className='shadow-container'>
      <PagesTitle title={"Activity Log"} />
      <div className="statement-body p-[10px]">
        <Filter fun={submitHandler} setLimit={setLimit} setStartDate={setStartDate} startDate={startDate} endDate={endDate} setEnddate={setEndDate} />
        <div className="account-table">

          <Table data={data} />
        </div>
      </div>
    </div>
  )
}

export default ActivityLog