import PagesTitle from '../../components/pagesTitle/PagesTitle'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { useChangePasswordMutation } from '../../services/changePassword/ChangePassword';
import { toast } from 'react-toastify';
///styles
import "./styles.scss"
const ChangePassword = () => {
  const [passwordIconShow, setPasswordIconShow] = useState({
    old: true,
    new: true,
    confirm: true
  })

  const [formData, setFormData] = useState({
    oldPassword: "",
    confirmNewPassword: "",
    newPassword: ""
  })
  const [error, setError] = useState({
    oldPassword: false,
    confirmNewPassword: false,
    newPassword: false
  })
  const [trigger, { data }] = useChangePasswordMutation()

  const sumnitHandler = (e) => {
    e.preventDefault()
    let errors = {};
    for (let key in formData) {
      if (formData[key] === "") {
        errors[key] = true;
      } else {
        errors[key] = false;
      }
    }
    setError(errors);

    let checkErr = false;
    for (let key in errors) {
      if (errors[key] === true) {
        checkErr = true;
        break;
      }
    }

    if (!checkErr) {

      trigger(formData)
    }
  }
  const formHandler = (e) => {
    const { name, value } = e.target
    if (!value) {
      setError((prev) => {
        return {
          ...prev, [name]: true
        }
      })
    } else {
      setError((prev) => {
        return {
          ...prev, [name]: false
        }
      })

    }
    setFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  useEffect(() => {
    if (data?.error) {
      toast.error(data?.message)
    } else if (data?.error == false) {
      toast.success(data?.message)
    }
  }, [data])

  return (
    <div className='shadow-container'>
      <PagesTitle title={"Change Password"} />
      <form className='changepassword-form'>
        <div className="form-row">

          <label htmlFor="">Old Password</label>
          <input type={!passwordIconShow?.old ? "text" : "password"} name='oldPassword' value={formData?.oldPassword} onChange={formHandler} />
          {error?.oldPassword && <span style={{ color: "red" }}>Please Enter Old Password</span>}
          <div className="password-icon" onClick={() => setPasswordIconShow((prev) => {
            return {
              ...prev,
              old: !passwordIconShow?.old
            }
          })}>
            {!passwordIconShow?.old ?
              <VisibilityIcon /> :
              <VisibilityOffIcon />
            }
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="">New Password</label>
          <input type={!passwordIconShow?.new ? "text" : "password"} name='newPassword' onChange={formHandler} />
          {error?.newPassword && <span style={{ color: "red" }}>Please Enter New Password</span>}
          <div className="password-icon" onClick={() => setPasswordIconShow((prev) => {
            return {
              ...prev,
              new: !passwordIconShow?.new
            }
          })}>
            {!passwordIconShow?.new ?
              <VisibilityIcon /> :
              <VisibilityOffIcon />
            }
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="">Confirm New Password</label>
          <input type={!passwordIconShow?.confirm ? "text" : "password"} name='confirmNewPassword' onChange={formHandler} />
          {error?.confirmNewPassword && <span style={{ color: "red" }}>Please Enter Confirm Password</span>}
          <div className="password-icon" onClick={() => setPasswordIconShow((prev) => {
            return {
              ...prev,
              confirm: !passwordIconShow?.confirm
            }
          })}>
            {!passwordIconShow?.confirm ?
              <VisibilityIcon /> :
              <VisibilityOffIcon />
            }
          </div>
        </div>
        <div className="form-row">
          <button onClick={sumnitHandler}>Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword