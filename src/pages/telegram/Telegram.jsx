import { useEffect, useState } from 'react';
import './telegram.scss';

import { useNavigate } from 'react-router';
import { useOtpVerificationMutation } from '../../services/otpVerifiaction.js/OtpVerification';
import { logo } from '../../assets';
import { toast } from 'react-toastify';
import { login } from '../../routes/PagesUrl';

const Telegram = () => {
  const [code, setCode] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus the next input field if the current field has a value
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value) {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }

      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];

    pasteData.split('').forEach((char, index) => {
      if (!isNaN(char) && index < newCode.length) {
        newCode[index] = char;
      }
    });

    setCode(newCode);

    // Focus the next empty input field after pasting
    const nextEmptyIndex = newCode.findIndex(char => char === '');
    if (nextEmptyIndex !== -1) {
      e.target.form.elements[nextEmptyIndex].focus();
    }
  };
  const nav = useNavigate()

  const [trigger, { data,isError }] = useOtpVerificationMutation()

  let userData = localStorage.getItem('user_name') // Join array to form a single string
  const otpSubmitHandler = async () => {
  
   

  };

  const handleSubmit = async () => {
    try {
      const result = code.join('');
      const userLogin = {
        "user_name": userData,
        "login_code": result
      }
      const response = await  trigger(userLogin);
      if(response?.error?.data?.message == "Code expired"){
        nav(login)
      }
    } catch (err) {
      return err
    }
  };

  useEffect(() => {
    // Call otpSubmitHandler only if all input fields are filled
    if (code.every(char => char !== '')) {
      handleSubmit();
    }
  }, [code]);  // Dependency array includes `code`
  const token = localStorage.getItem("telegramToken")
  const user_name = localStorage.getItem("user_name")
  
  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message)
      nav("/")
      localStorage.setItem("token", token)
      localStorage.setItem("user_name", user_name)
    } 
  }, [data])


  return (
    <div className='main-telegram'>
      <div className="telegram">
        <img src={logo} alt="Hero Book Exchange Logo" />
        <h4>Security code verification using Telegram app</h4>
        <p>Enter 6 digit code from Telegram bot <span>resend</span></p>

        <div className="code-inputs">
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={e => e.target.select()}
              className="code-input"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Telegram;
