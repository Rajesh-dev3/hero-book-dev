
///styles
import { useEffect } from "react"
import { useAccountStatementMutation } from "../../services/accountStatement/accountStatement"
import Filter from "./Filter"
import Table from "./Table"
import "./styles.scss"

const AccountSatement = () => {
const [trigger,{data}]=useAccountStatementMutation()
useEffect(() => {

}, [])

  return (
    <div className='satement-container'>
      <div className="satement-header"><h4 className="header-title">Account Statement</h4></div>
     <div className="statement-body p-[10px]">
<Filter/>
<Table/>
     </div>
    </div>
  )
}

export default AccountSatement