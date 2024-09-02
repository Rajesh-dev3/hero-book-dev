import React, { useState } from 'react'
import './style.scss'
import DifferenceIcon from '@mui/icons-material/Difference';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import code from '../../assets/img/qrcode.png';
const PaymentDetail = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleToggle = () => {
        setIsVisible(!isVisible);
      };
  return (
    <>
    <div className='PaymentDetail'>
        <div className="heading">
            <p className='payment-heading'> COPY THIS BANK DETAILS AND MAKE PAYMENT </p>
        </div>
        <div className="detail">
           
            <div className="account-number data">
                <p className=''>ACCOUNT NUMBER</p>
                <p>1234556 <span><DifferenceIcon/></span></p>

            </div>
            <div className="upi-id data">
                <p>UPI ID</p>
                <p>1234556<span><DifferenceIcon/></span></p>
            </div>
            <div className="account-holder data">
                <p>ACCOUNT HOLDER</p>
                <p>1234556<span><DifferenceIcon/></span></p>
            </div>
            <div className="barcode">
                
                <p onClick={handleToggle}>
                {isVisible ? '' : ''} CLICK HERE FOR QR CODE<span><QrCodeScannerIcon/></span></p>
                
            </div>
        </div>
      
    </div>
    {isVisible && (
    <div className="qrcode">
            <img src={code} alt="barcode" />
        </div>
    )}
    </>
  )
}

export default PaymentDetail