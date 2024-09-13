import { useEffect } from "react"
import { useExposureMutation } from "../../services/exposure/exposure"
import "./styles.scss"
import { Link } from "react-router-dom"
import BetLoader from "../loader/BetLoader"
const ExposureTable = ({closeModa2}) => {
    const [trigger,{data,isLoading}] =useExposureMutation()
const userName= localStorage.getItem("user_name")
    useEffect(() => {
   trigger({"user_name":userName})
    }, [])
  return (
    <div className='exposure-table'>
      <div className="title">
        <h1>My Market</h1>
      </div>
      <div className="run-content2">
        <table>

          <tbody >
            <tr >
              <th >Event Type </th>
              <th >Event Name</th>
              <th >Match Name</th>
              <th >Trade</th>
            </tr>
            {
              isLoading? <BetLoader/>:
            data?.data?.data?.map((item) => {
              return (
                
                <tr className="bg-light" key={item?.key}>
                  <td >{item?.event_type}</td>
                  <td ><Link to={`/game-detail/${item?.sport_id}/${item?.match_id}/${item?.marketId}`} onClick={closeModa2}>{item?.event_name}</Link> </td>
                  <td >{item?.market}</td>
                  <td >{item?.trade}</td>
                </tr>
              )
            })
          }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExposureTable