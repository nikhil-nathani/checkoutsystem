import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import  "./styles.css"
import {AiOutlineCheck} from 'react-icons/ai'
import {HiX} from 'react-icons/hi'


const SubmitDeliveryDetail=(props)=>{
const {register,errors,handleSubmit,height,width,dropshippingChecked,setErrorCheck,errorCheck,email,setEmail,phoneNumber,setPhoneNumber,address,setAddress,dropshipName,setDropshipName,dropshipNumber,setDropshipNumber}=props

 const onSubmit = (data) => console.log(data);


useEffect(() => {
  setEmail(email)
  setPhoneNumber(phoneNumber)
  setAddress(address)
  setDropshipName(dropshipName)
  setDropshipNumber(dropshipNumber)
  console.log("updating")
}, [])

useEffect(() => {
console.log(address,"address updated")
  if (address?.length !== 0) {
    setErrorCheck({ ...errorCheck, address: false });
  } else {
    setErrorCheck({ ...errorCheck, address: true });
  }

}, [address])

return (
  <>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width:dropshippingChecked? "50%":"100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              padding: 5,
              border:
                email?.length > 0
                  ? errorCheck.email
                    ? "2px solid #ff961b"
                    : "2px solid #1bd97b"
                  : "2px solid grey",
            }}
          >
            <input
            autoComplete="off"
              type="email"
              placeholder="Email"
              {...register("Email", { required: true })}
              style={{
                border: "none",
                height: height / 14,
                display: "flex",
                width: "100%",
              }}
              onChange={(e) => {
           
                setEmail(e.target.value);
                if (
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    e.target.value
                  )
                ) {
                  setErrorCheck({ ...errorCheck, email: false });
                } else {
                  setErrorCheck({ ...errorCheck, email: true });
                }
              }}
            />
            {email?.length > 0 ? (
              errorCheck.email ? (
                <HiX color="#ff961b" size={20} style={{ marginLeft: 10 }} />
              ) : (
                <AiOutlineCheck
                  color="#1bd97b"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
              )
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              padding: 5,
              height: height / 14,
              border:
                phoneNumber?.length > 0
                  ? errorCheck.phoneNumber
                    ? "2px solid #ff961b"
                    : "2px solid #1bd97b"
                  : "2px solid grey",
            }}
          >
            <input
            autoComplete="off"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              {...register("Phone Number", { required: true, maxLength: 20 })}
              style={{
                display: "flex",
                width: "100%",
              }}
              accept=""
              onChange={(e) => {
                const re = /^[0-9\b]+$/;

                // if value is not blank, then test the regex

                if (e.target.value === "" || re.test(e.target.value)) {
                  setPhoneNumber(e.target.value);
                  if (e.target.value.length > 20 || e.target.value.length < 6) {
                    setErrorCheck({ ...errorCheck, phoneNumber: true });
                  } else {
                    setErrorCheck({ ...errorCheck, phoneNumber: false });
                  }
                }
              }}
            />
            {phoneNumber?.length > 0 ? (
              errorCheck.phoneNumber ? (
                <HiX color="#ff961b" size={20} style={{ marginLeft: 10 }} />
              ) : (
                <AiOutlineCheck
                  color="#1bd97b"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
              )
            ) : null}
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              padding: 5,
              height: height / 8,
              border:
                address?.length > 0
                  ? errorCheck.address
                    ? "2px solid #ff961b"
                    : "2px solid #1bd97b"
                  : "2px solid grey",
            }}
          >
            <div
              style={{
                fontSize: 15,
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: 5,
              }}
            >
              {address?.length ? address?.length+' / 120' : 0 + " / 120"}
            </div>

            <textarea
            autoComplete="off"
              maxLength={120}
              value={address}
              {...register("Address", { required: true, maxLength: 119 })}
              style={{
                borderColor: "grey",
                height: "100%",
                width: "100%",
                maxHeight: "100%",
                maxWidth: "100%",
                resize: "none",
              }}
           
          
              onChange={(e) => {
                setAddress(e.target.value);
                if(address?.length!==0){
                  setErrorCheck({...errorCheck,address:false})
                }else{
                  setErrorCheck({ ...errorCheck, address: true });
                }
              }}
            />
            {address?.length > 0 ? (
              errorCheck.address ? (
                <HiX color="#ff961b" size={20} style={{ marginLeft: 10 }} />
              ) : (
                <AiOutlineCheck
                  color="#1bd97b"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
              )
            ) : null}
          </div>
        </div>
        {dropshippingChecked?
           <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              padding: 5,
              height: height / 14,
              border:
                dropshipName?.length > 0
                    ? "2px solid #1bd97b"
                  : "2px solid grey",
            }}
          >
            <input
            autoComplete="off"
              type="text"
              placeholder="Dropshipper Name"
              {...register("Dropshipper Name", { required: true })}
              style={{
                borderWidth: 1,
                borderColor: "grey",
                height: height / 14,
                display: "flex",
                width: "100%",
              }}
              onChange={(e) => {
                 setDropshipName(e.target.value);
                if(e.target.value.length>0){
                  setErrorCheck({ ...errorCheck, droppshippingName: false });
                }
               
              }}
            />
            {dropshipName?.length > 0 ? (
                <AiOutlineCheck
                  color="#1bd97b"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
              )
             : null}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              padding: 5,
              height: height / 14,
              border:
                dropshipNumber?.length > 0
                  ? errorCheck.dropshippingNumber
                    ? "2px solid #ff961b"
                    : "2px solid #1bd97b"
                  : "2px solid grey",
            }}
          >
            <input
            autoComplete="off"
              type="text"
              placeholder="Dropshipper Phone Number"
              {...register("Dropshipper Phone Number", {
                required: true,
                maxLength: 20,
              })}
              style={{
                borderWidth: 1,
                borderColor: "grey",
                height: height / 14,
                width:'100%',
                display: "flex",
                
              }}
              value={dropshipNumber}
              onChange={(e)=>{
                     const re = /^[0-9\b]+$/;
                     // if value is not blank, then test the regex

                     if (e.target.value === "" || re.test(e.target.value)) {
                       setDropshipNumber(e.target.value);
                       if (
                         e.target.value.length > 20 ||
                         e.target.value.length < 6
                       ) {
                         setErrorCheck({ ...errorCheck, dropshippingNumber: true });
                       } else {
                         setErrorCheck({ ...errorCheck, dropshippingNumber: false });
                       }
                     }
                
              }}
            />
            {dropshipNumber?.length > 0 ? (
              errorCheck.dropshippingNumber ? (
                <HiX color="#ff961b" size={20} style={{ marginLeft: 10 }} />
              ) : (
                <AiOutlineCheck
                  color="#1bd97b"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
              )
            ) : null}
          </div>
        </div>:null}
     
      </div>
    </form>
  </>
);
}


export default SubmitDeliveryDetail