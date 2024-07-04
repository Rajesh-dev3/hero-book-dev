import React, { useEffect, useState } from 'react'
////styles
import "./styles.scss"
import { faceboo, instagram, logo, telegram, whatsApp } from '../../assets'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { useLoginMutation } from '../../services/auth/Login';
const Login = () => {
const [formData, setFormData] = useState({user_name:"demo007",password:"123456"})
  const [trigger,{data}]=useLoginMutation()

  const formHandler = (e)=>{
    const {name,value} = e.target
    setFormData((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }
  const submitForm = (e)=>{
    e.preventDefault()
    trigger({user_name:"demo007",password:"123456"})
  }

  useEffect(() => {
   if(data){
    localStorage.setItem("token",data?.data?.token)
    console.log(data)
   }
  }, [data])
  
  return (
    <div className='login-container'>
      <div className="login-center-col">
        <div className="login-logo-head">
          <img src={logo} alt="" />
        </div>
        <form autoComplete={false}>
          <div className="login-heading">Login </div>
          <div className="input-row">
            <div className="input">
<input type="text" placeholder='Username' name= "user_name" onChange={formHandler}/>
            </div>
            <div className="input-icon">
              <PersonIcon/>
            </div>
          </div>
          <div className="input-row">
            <div className="input">
<input type="password" placeholder='Username' name= "password"/>
            </div>
            <div className="input-icon">
              <KeyIcon/>
            </div>
          </div>
          <div className="login-btn-container">
            <button>Login <LoginIcon/></button>
            <button onClick={submitForm}>Login with demo ID <LoginIcon/></button>
          </div>
          <div className="login-captcha">
          This site is protected by reCAPTCHA and the Google
          <span> Privacy Policy</span> and
          <span> Terms of Service </span>Apply
          </div>
        </form>
      </div>
      <div className="login-footer">
        <ul>
          <li>+91 7299444466 / +91 7299444488</li>
          <li>24X7 Support</li>
          <li>
            <img src={faceboo} alt="" />
            <img src={instagram} alt="" />
            <img src={telegram} alt="" />
            <img src={whatsApp} alt="" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Login