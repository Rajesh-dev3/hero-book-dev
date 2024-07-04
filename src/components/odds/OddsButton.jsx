import React from 'react'

const OddsButton = ({lay,price}) => {
  return (
    <div className={`${lay?"lay":"back"} odd-box `}><span className="bet-odd"><b>{price}</b></span></div>
  )
}

export default OddsButton