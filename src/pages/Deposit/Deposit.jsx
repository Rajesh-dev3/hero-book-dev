// import React, { useState } from 'react'
// import './style.scss';
// import PaymentCard from '../../components/PaymentCard/PaymentCard';
// import PaymentDetail from '../../components/PaymentDetail/PaymentDetail';
// import { upload } from '../../assets';

// const Deposit = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     // Handle image upload and preview
//     const handleImageChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const imageUrl = URL.createObjectURL(file);
//         setSelectedImage(imageUrl);
//       }
//     };
  
//     // Handle removing the selected image
//     const handleRemoveImage = () => {
//       setSelectedImage(null);
//     };
//   return (
//     <>
//     <div className="deposit-sec">
// <div className="titelHeadView">
//     <h1>Payment Deposit</h1>
// </div><div className="payment">
//     <div className="payment-type">
//         <PaymentCard/>
//         <PaymentCard/>
     
//     </div>
//     <div className="payment-detail">
//         <PaymentDetail/>
//     </div>
// </div>
// <div className="upload-payment-heading">
//     <p>upload payment reciept</p>
//     <p>(Maximum Size Of The Image 5MB)</p>
// </div>
// <div className="upload-payment-recipt">


//     <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
//       {selectedImage ? (
//         <>
//           <img
//             src={selectedImage}
//             alt="Selected Preview"
//             style={{
//               maxWidth: '97%',
//               height: '180px',
//               // border: '1px solid #ccc',
//               // padding: '5px',
//               cursor: 'pointer'

//             }}
//           />
//           <button
//             onClick={handleRemoveImage}
//             style={{
//               position: 'absolute',
//               top: '10px',
//               right: '10px',
//               backgroundColor: 'red',
//               border: 'none',
//               color: 'white',
//               cursor: 'pointer',
//               borderRadius: '50%',
//               width: '24px',
//               height: '24px',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center'
//             }}
//           >
//             X
//           </button>
//         </>
//       ) : (
//         <label
//           htmlFor="upload-button"
//           style={{
//             display: 'inline-block',
//             padding: '10px',
//             backgroundColor: 'transparent',
//             marginTop:'50px',
//             // border: '1px solid #ccc',
//             cursor: 'pointer'
//           }}
//         >
//           Upload File (clear image) <span style={{color:'red'}}>*</span> <br />
//           <img src={upload} alt="upload" className='upload-imgs' />
//           Drop your File to UPLOAD or <span style={{color:'#FFD085'}}>  BROWSE</span>
//           <input
//             id="upload-button"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ display: 'none' }}
//           />
//         </label>
//       )}
//     </div>
// </div>

//     </div>
//     </>
//   )
// }

// export default Deposit