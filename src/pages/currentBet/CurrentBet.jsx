import { useEffect, useState } from 'react'
import { useGetMyBetMutation } from '../../services/myBet/myBet'
import Filter from './CurrentFilter'
import moment from 'moment'
import Table from './Table';
import PagesTitle from "../../components/pagesTitle/PagesTitle";

const CurrentBet = () => {
  const [startDate, setStartDate] = useState(moment().subtract(6, 'days').format('YYYY-MM-DD'))
  const [allBack, setAllBack] = useState("All")
 
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [formData, setFormData] = useState(
    {
      from_date: moment(startDate).startOf('day').unix(),
      to_date: moment(endDate).endOf('day').unix(),
      limit: 10,
      pageno: 1,
      betType: "P",
      market_id: String(0),
      match_id: 0,
      sport_id: 0
    }
  )
  const [trigger, { data }] = useGetMyBetMutation()

  useEffect(() => {
    trigger(formData)
  }, [formData?.sport_id])

  const submitHandler = () => {
    trigger(formData)
  }

  const findFilterData = data?.data?.filter((item)=>item?.Type == allBack)

  return (
    <div className='shadow-container'>
      <PagesTitle title="Current Bets" />
      <div className="statement-body p-[10px]">
        <Filter submitHandler={submitHandler} allBack={allBack} setAllBack={setAllBack} formData={formData} setFormData={setFormData} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
        <Table data={allBack=="All" ? data?.data: findFilterData} />
      </div>
    </div>
  )
}

export default CurrentBet