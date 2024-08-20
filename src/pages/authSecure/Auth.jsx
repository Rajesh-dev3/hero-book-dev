import "./auth.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useGetConnectionIdMutation, useSaveTelegramDisableCodeMutation, useTeleConnectedStatusMutation, useTelegramDisableMutation } from "../../services/otpVerifiaction.js/SaveTelegramDisable";
import { login } from "../../routes/PagesUrl";

const AuthSecure = () => {
const [password, setPassword] = useState("")
  // 
  const [checkEnable, setCheckEnable] = useState(null)

  
  const [responseData, setResponseData] = useState("")
  let telegramConnected = localStorage.getItem('telegramConnected')// Join array to form a single string
  let userData = localStorage.getItem('user_name')// Join array to form a single string
  const checkType = telegramConnected==1
const [trigge,{data:responseConnectionId}] = useGetConnectionIdMutation()
  const otpSubmitHandler = async() => {
    
   const data =  {
      "user_name":userData,
      "password":password
  }
  trigge(data)
   
  };

useEffect(() => {
  if(responseConnectionId?.error == false){
    setResponseData(responseConnectionId?.message)
  }
}, [responseConnectionId])

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

 // Join array to form a single string
  const [trigger,{data:disableResponse}] = useTelegramDisableMutation()

  const otpSubmitHandler2 = async() => {
    const result = code.join(''); 
   const data =  {
      "user_name":userData,
      "disables_telegram_code":result
  }
  trigger(data)
 
   
  };

  useEffect(() => {
    // Call otpSubmitHandler only if all input fields are filled
    if (code.every(char => char !== '')) {
      otpSubmitHandler2();
    }
  }, [code]);

const [trig,] = useSaveTelegramDisableCodeMutation()


const handler =()=>{
  trig({ "user_name":userData}) 
  setCheckEnable(0)
}
// const checkIsTelegramConnected= ()=>{
//   axios.post("http://52.66.201.64:8786/api/v5/teleConnectedStatus",{ "user_name":userData?.user_name},{ headers: {
//     Authorization: `Bearer ${userData?.token}`,
//     'Content-Type': 'application/json'
//   }}).then((response)=>{
//     console.log(response?.data)
//     if(response?.data?.success){
//       localStorage.clear()
//       window.location.replace("/")
//     }
//   }).catch((error)=>{
//     console.log(error)
//   })
// }
const [trigg, { data: checkTelegramConnection }] = useTeleConnectedStatusMutation();

useEffect(() => {
  // Define the function to be called repeatedly
  const triggerMutation = () => {
    trigg({ "user_name": userData })
      .unwrap()
      .then(response => {
      })
      .catch(err => {
      });
  };

  if (telegramConnected == 0) {
    const intervalId = setInterval(triggerMutation, 2000);

    // Clean up the interval when the component unmounts or when dependencies change
    return () => clearInterval(intervalId);
  }
}, [telegramConnected, userData,]);

useEffect(() => {
  if(checkTelegramConnection?.success){
          localStorage.clear()
          window.location.replace(login)
        }
}, [checkTelegramConnection])



useEffect(() => {
  if(disableResponse?.success){
    toast.success(disableResponse?.message)
    
    nav("/")
    localStorage.clear();
  }else if(disableResponse?.message == "Code expired"){
    toast.error(disableResponse?.message)
    nav("/")
  }
}, [disableResponse])


  return (
    <div className="main-auth-container">
      <div className="auth-container">
        <h2>Secure Auth Verification</h2>
        <p>Home/SecureAuth</p>
      </div>
      <div className="secur-auth">
        <h2>
          Secure Auth Varification status:<button onClick={()=>checkType?handler(): setCheckEnable(1)}>{checkType ?"Disable":"Enable"} </button>
        </h2>
        <p>Please select below option to enable secure auth verification </p>
        </div>
        {checkEnable == 1
        ?
    <>
      
        <div className="login-password">
        <p>Please enter your login password to continue</p>

          <div className="input-m">
        <input 
                type="password" 
                placeholder="Enter your password" 
              id="password"
              onChange={(e)=>setPassword(e.target?.value)}
                
            />
            <button onClick={()=>password?otpSubmitHandler():toast.error("Please enter password")}>Get Connection Id</button>
            </div>
        </div>

</>:checkEnable==0? <div className="telegram">
        <h4>Security code verification using Talegram app</h4>
        <p>Enter 6 digit code from Talegram bot </p>

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
      </div>:""}
 {
responseData?<div dangerouslySetInnerHTML={{ __html: responseData }} style={{marginTop:"10px",marginInline:"20px",textAlign:"center"}}/>
  
:""
 }
    
    </div>
  );
};

export default AuthSecure;
