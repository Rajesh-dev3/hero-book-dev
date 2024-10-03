import { useEffect, useState } from 'react'
import PagesTitle from '../../components/pagesTitle/PagesTitle'
import Filter from './Filter'
import Table from './Table'
import { useUnSetteledBetMutation } from '../../services/unSetteledBetService/unSetteledBet'

const UnSetteledBet = () => {
    const [allBack, setAllBack] = useState("All")
    const [trigger,{data}] =useUnSetteledBetMutation()
    useEffect(() => {
        trigger({user_name:localStorage.getItem("user_name")})
    }, [allBack])
    
  return (
    <div className='shadow-container'>
    <PagesTitle title={"Un-Setteled Bet"} />
    <div className="statement-body p-[10px]">
      <Filter  allBack={allBack} setAllBack={setAllBack}/>
      <div className="account-table">
     
        <Table data={allBack=="Lay"?[]: data?.data?.data} />
      
      </div>
    </div>
  </div>
  )
}

export default UnSetteledBet