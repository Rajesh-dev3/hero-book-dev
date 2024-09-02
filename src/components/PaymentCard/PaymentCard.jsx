import React from 'react'
import './style.scss';
import { phonepay } from '../../assets'

const PaymentCard = () => {
  return (

    <div className="PaymentCard">
        <div className="card">

        <img src={phonepay} alt="logo" />
        <p>PhonePay</p>
        </div>
    </div>
  )
}

export default PaymentCard