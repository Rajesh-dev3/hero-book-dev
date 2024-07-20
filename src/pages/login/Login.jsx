import { useEffect, useState } from 'react'
import { faceboo, instagram, logo, telegram, whatsApp } from '../../assets'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { useLoginMutation } from '../../services/auth/Login';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
////styles
import "./styles.scss"
const Login = () => {
  const [formData, setFormData] = useState({ user_name: "", password: "" })
  const [trigger, { data }] = useLoginMutation()
  const nav = useNavigate()
  const formHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }
  const submitForm = (key, e) => {
    e.preventDefault()
    const requestResponse = key == 0 ? formData : { user_name: "demo007", password: "123456" }
    trigger(requestResponse)
  }
  const token = data?.data?.token
  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", token)
      localStorage.setItem("user_name", data?.data?.user_name)
      window.location.replace("/")
      toast.success(data?.message)
    } else {
      toast.error(data?.message)
    }
  }, [data])
  useEffect(() => {
    const localStorageTOken = localStorage.getItem("token")
    if (localStorageTOken) {
      nav("/")

    }
  }, [])

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
              <input type="text" placeholder='Username' name="user_name" onChange={formHandler} />
            </div>
            <div className="input-icon">
              <PersonIcon />
            </div>
          </div>
          <div className="input-row">
            <div className="input">
              <input type="password" placeholder='Username' name="password" onChange={formHandler} />
            </div>
            <div className="input-icon">
              <KeyIcon />
            </div>
          </div>
          <div className="login-btn-container">
            <button onClick={(e) => submitForm(0, e)}>Login <LoginIcon /></button>
            <button onClick={(e) => submitForm(1, e)}>Login with demo ID <LoginIcon /></button>
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