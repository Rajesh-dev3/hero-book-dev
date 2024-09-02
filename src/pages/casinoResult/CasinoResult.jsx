import { useEffect, useState } from "react"
import PagesTitle from "../../components/pagesTitle/PagesTitle"
import Filter from "./CasinoResultFilter"
import { useCasinoResultMutation } from "../../services/casinoResult/casinoResult"
import Table from "./CasinoResultTable"
import moment from "moment"

const CasinoResult = () => {
    const [startDate, setStartDate] = useState(moment().subtract(6, 'days').format('YYYY-MM-DD'))
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
    // const [trigger, { data }] = useGetMyBetMutation()
  
    // useEffect(() => {
    // //   trigger(formData)
    // }, [formData?.sport_id])
  
    // const submitHandler = () => {
    // //   trigger(formData)
    // }
    const [fetchCasinoResults, { data, isLoading, error }] = useCasinoResultMutation();

  
   
      useEffect(() => {
        fetchCasinoResults( {
          "user_name":"aakash07"
      });
      // Fetch data
    
  },[]);
  return (
    <div className='shadow-container'>
    <PagesTitle title="Casino Result" />
    <div className="statement-body p-[10px]">
      <Filter submitHandler={""} formData={formData} setFormData={setFormData} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
      <div className="account-table">

      {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching data</p>}
          <Table data={data?.data[0]?.data} /> {/* Use the fetched data */}
        </div>
    </div>
  </div>
  )
}

export default CasinoResult