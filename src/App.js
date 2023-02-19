import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaChevronRight, FaRandom } from "react-icons/fa";
import Checkbox from "./Components/checkbox/checkbox";
import { css } from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useWindowDimensions from "./hooks/windowDimensions";
import SubmitDeliveryDetail from "./Components/SubmitDeliveryDetail";
import { useForm } from "react-hook-form";
const styles = {
  container: {
    backgroundColor: "#FFFAE6",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    zindex: 0,
  },
  checkoutBanner: {
    width: "70%",
    height: "80vh",
    backgroundColor: "white",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  indicatorContainer: {
    marginTop: "-40px",
    width: "60%",
    height: "15%",
    backgroundColor: "#FFFAE6",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const TopIndicatorNumber = styled.div`
  background-color: #ff8a00;
  border-radius: 32px;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-align: center;

  ${(props) =>
    props.active == true &&
    css`
      background-color: #ffe4b8;
      color: #ff8a00;
    `}
`;
const TopIndicatorText = styled.div`
  background: transparent;
  height: 30px;
  font-size: 20px;
  color: #ff8a00;
  font-weight: 600;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
function generateCode() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // valid characters
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
const Summary=(props)=>{
  const {getWidth,randomNumber,isChecked,total,width,handleSubmit,errorCheck,setStep,step,selectedPayment,selectedShipment}=props
  return (
    <div
      style={{
        height: "100%",
        display: "flex",

        alignItems: "center",
        flexDirection: "column",
        width: "30%",
        marginTop: 10,
      }}
    >
      <div
        style={{
          height: "50%",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#ff8a00",
            fontWeight: "bold",
            margin: 5,
            fontSize: getWidth(2),
          }}
        >
          Summary
        </div>
        <div
          style={{
            color: "grey",
            margin: 5,
            fontSize: getWidth(0.9),
          }}
        >
          {randomNumber + " items purchased"}
        </div>
        {selectedPayment||selectedShipment?       <div
              style={{
                color: "grey",
                width: "60%",
                border: "1px solid #cccccc",
                marginTop: 10,
                marginLeft: 5,
              }}
            />:null}
        {step > 1 && selectedShipment ? (
          <div>
     
            <div
              style={{
                fontSize: width / 110,
                width: "100%",
                textAlign: "left",
                margin: 5,
                fontWeight: 400,
              }}
            >
              Delivery estimation
            </div>
            <div
              style={{
                fontSize: width / 110,
                width: "100%",
                fontWeight: "bold",
                textAlign: "left",
                color: "#31dc87",
                margin: 5,
              }}
            >
              {`${selectedShipment?.estimation} by ${selectedShipment?.name}`}
            </div>
          </div>
        ) : null}
        {step > 1 && selectedPayment ? (
          <div>
       
            <div
              style={{
                fontSize: width / 110,
                width: "100%",
                textAlign: "left",
                margin: 5,
                fontWeight: 400,
              }}
            >
              Payment Method
            </div>
            <div
              style={{
                fontSize: width / 110,
                width: "100%",
                fontWeight: "bold",
                textAlign: "left",
                color: "#31dc87",
                margin: 5,
              }}
            >
              {`${selectedPayment.name}`}
            </div>
          </div>
        ) : null}
      </div>
      <div
        style={{
          height: "37%",
          width: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* COST OF GOODS */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            margin: 0,
          }}
        >
          <div
            style={{
              fontSize: width / 100,
              color: "#676767",
              width: "78%",
            }}
          >
            Cost of goods
          </div>
          <div
            style={{
              fontSize: width / 110,
              width: "40%",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {(randomNumber * 130000).toLocaleString()}
          </div>
        </div>
        {/* COST OF GOODS */}
        {isChecked ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              marginTop: 5,
            }}
          >
            <div
              style={{
                fontSize: width / 100,
                color: "#676767",
                width: "88%",
              }}
            >
              Dropshipping Fee
            </div>
            <div
              style={{
                fontSize: width / 110,
                width: "20%",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {(5900).toLocaleString()}
            </div>
          </div>
        ) : null}
        {/* COST OF GOODS */}
        {step > 1 && selectedShipment ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              margin: 5,
            }}
          >
            <div
              style={{
                fontSize: width / 100,
                color: "#676767",
                width: "90%",
              }}
            >
              <b> {selectedShipment?.name}</b> shipment
            </div>
            <div
              style={{
                fontSize: width / 110,
                width: "40%",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {selectedShipment?.price.toLocaleString()}
            </div>
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "#ff8a00",
            width: "95%",
            marginTop: 5,
          }}
        >
          <div
            style={{
              fontSize: width / 50,
              color: "#ff8a00",
              width: "50%",
              fontWeight: "bold",
            }}
          >
            Total
          </div>
          <div
            style={{
              fontSize: width / 50,
              width: "70%",
              fontWeight: "bold",
              color: "#ff8a00",
              textAlign: "right",
            }}
          >
            {total?.toLocaleString()}
          </div>
        </div>
        {step<3?
        <div
          style={{
            fontSize: width / 90,
            width: "100%",
            color: "white",
            backgroundColor:step!==2?'#ff8a00':selectedPayment&&selectedShipment?'#ff8a00':'#cccccc',
            height: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 2px 9px #F4AAB9",
            marginTop: 5,
            cursor: "pointer",
          }}
          onClick={() => {
            let check = Object.values(errorCheck).every((v) => v === false);
            if (step == 1) {
              if (check) {
                setStep(2);
              }
            }
            if (step == 2) {
              if (selectedPayment && selectedShipment) {
                setStep(3);
              }
            }
          }}
        >
          {step == 1
            ? "Continue to payment"
            : selectedPayment?`Pay with ${selectedPayment?.name}`:"Choose payment method"}
        </div>
:null}
      </div>
    </div>
  );
}
const ShipmentPanel=(props)=>{
  const {getHeight,getWidth,setSelectedShipment,selectedShipment}=props
  const shipmentMethods = [
    {id:1, name: "GO-SEND", price: 15000,estimation:'Today'},
    { id:2,name: "JNE", price: 9000 ,estimation:'2 days'},
    { id:3,name: "Personal Courier", price: 29000 ,estimation:'1 day'},
  ];


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: getHeight(10),

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#ff8a00",
            fontSize: getWidth(3),
            fontWeight: "bold",
            textDecorationLine: "underline",
            textDecorationColor: "#EEEEEE",
            letterSpacing: 1,
            textDecorationThickness: 5,
          }}
        >
          Shipment
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
        {shipmentMethods?.map((v, i) => {
          return (
            <div
              cursor
              style={{
                fontSize: getWidth(0.8),
                backgroundColor: "white",
                width: getWidth(10),
                height: getHeight(8),
                margin: 10,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                border:
                  selectedShipment?.id == v?.id
                    ? "2px solid #31dc87"
                    : "2px solid #cccccc",
                cursor: "pointer",
                backgroundColor:
                  selectedShipment?.id == v?.id
                    ? "#e7faf0"
                    : "#ffffff",
              }}
              onClick={() => {
                setSelectedShipment(v);
              }}
            >
              <div style={{ padding: 2, fontWeight: 600, marginLeft: 5 }}>
                {v?.name}
              </div>
              <div style={{ padding: 2, fontWeight: "bold", marginLeft: 5 }}>
                {v?.price.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PaymentPanel = (props) => {
  const { getHeight, getWidth, setSelectedPayment, selectedPayment } = props;
  const paymentMethods = [
    { id: 1, name: "E-Wallet" },
    { id: 2, name: "Bank Transfer" },
    { id: 3, name: "Virtual Account"},
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: getHeight(10),

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#ff8a00",
            fontSize: getWidth(3),
            fontWeight: "bold",
            textDecorationLine: "underline",
            textDecorationColor: "#EEEEEE",
            letterSpacing: 1,
            textDecorationThickness: 5,
          }}
        >
          Payment
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {paymentMethods?.map((v, i) => {
          return (
            <div
              cursor
              style={{
                fontSize: getWidth(0.8),
                backgroundColor: "white",
                width: getWidth(10),
                height: getHeight(8),
                margin: 10,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                border:
                  selectedPayment?.id == v?.id
                    ? "2px solid #31dc87"
                    : "2px solid #cccccc",
                cursor: "pointer",
                backgroundColor:
                  selectedPayment?.id == v?.id ? "#e7faf0" : "#ffffff",
              }}
              onClick={() => {
                setSelectedPayment(v);
              }}
            >
              <div style={{ padding: 2, fontWeight: 600, marginLeft: 5 }}>
                {v?.name}
              </div>
              {v?.id=='1'?
              <div style={{ padding: 2, fontWeight: "bold", marginLeft: 5 }}>
               1,500,000 left
              </div>:null
        }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TopBarDeliveryDetails=(props)=>{
  const {getHeight,getWidth,isChecked,setIsChecked,width}=props
  return (
    <div
      style={{
        height: getHeight(10),

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "#ff8a00",
          fontSize: getWidth(3),
          fontWeight: "bold",
          textDecorationLine: "underline",
          textDecorationColor: "#EEEEEE",
          letterSpacing: 1,
          textDecorationThickness: 5,
        }}
      >
        Delivery Details
      </div>
      <div style={{ marginLeft: getWidth(7) }}>
        <Checkbox
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          width={width}
        />
      </div>
    </div>
  );
}

const TopBanner = () => {
  return (
    <div style={styles.indicatorContainer}>
      <TopIndicatorNumber>1</TopIndicatorNumber>
      <TopIndicatorText>Delivery</TopIndicatorText>
      <FaChevronRight
        size={20}
        color={"#ff8a00"}
        fontWeight={"bold"}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <TopIndicatorNumber>2</TopIndicatorNumber>
      <TopIndicatorText>Payment</TopIndicatorText>
      <FaChevronRight
        size={20}
        color={"#ff8a00"}
        fontWeight={"bold"}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <TopIndicatorNumber>3</TopIndicatorNumber>
      <TopIndicatorText>Finish</TopIndicatorText>
    </div>
  );
};
function App() {
  const { height, width } = useWindowDimensions();
  const [isChecked, setIsChecked] = useState(true );
  const [randomNumber, setRandomNumber] = useState();
  const [total, setTotal] = useState();
  const [step,setStep]=useState(1)
  const [errorCheck, setErrorCheck] = useState({
    email: true,
    phoneNumber: true,
    address: true,
    droppshippingName: true,
    dropshippingNumber: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldUnregister:false});
  const [selectedShipment,setSelectedShipment]=useState()
  const [selectedPayment, setSelectedPayment] = useState();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dropshipName, setDropshipName] = useState("");
  const [dropshipNumber, setDropshipNumber] = useState("");


  const getWidth = (percentage) => {
    return width * (percentage / 100);
  };
  const getHeight = (percentage) => {
    return height * (percentage / 100);
  };
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * (50 - 1 + 1) + 1));

  }, []);
  useEffect(()=>{
     setTotal((randomNumber * 130000)+5900);
  },[randomNumber])
  useEffect(() => {
    let totalpriceofproducts = randomNumber * 130000+selectedShipment?.price;
    if (isChecked) {
      totalpriceofproducts = totalpriceofproducts + 5900;
      setTotal(totalpriceofproducts);
    } else {
      setTotal(totalpriceofproducts);
    }
  }, [isChecked,selectedShipment]);
  return (
    <div className="App">
      <div style={styles.container}>
        <div style={styles.checkoutBanner}>
          <TopBanner />

          <div style={{ width: "90%", height: "100%" }}>
            
            <div
              style={{
                height: "30px",
                width: "120px",
                display: "flex",
                alignItems: "center",
                fontSize: getWidth(1),
                cursor:step==2?'pointer':null
              }}
              onClick={()=>{
setStep(1)
              }}
            >
              {step<3?    <AiOutlineArrowLeft size={30} style={{ marginRight: 10 }} />:null}
          
              {step==1?'Back to cart':step==2?'Back to delivery':null}
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",

                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "70%" }}>
                {step == 1 ? (
                  <>
                    <TopBarDeliveryDetails
                      getHeight={getHeight}
                      getWidth={getWidth}
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                      width={width}
                    />

                    <SubmitDeliveryDetail
                      register={register}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      width={width}
                      height={height}
                      dropshippingChecked={isChecked}
                      setErrorCheck={setErrorCheck}
                      errorCheck={errorCheck}
                      email={email}
                      setEmail={setEmail}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      address={address}
                      setAddress={setAddress}
                      dropshipName={dropshipName}
                      setDropshipName={setDropshipName}
                      dropshipNumber={dropshipNumber}
                      setDropshipNumber={setDropshipNumber}
                    />
                  </>
                ) : null}
                {step == 2 ? (
                  <>
                    <ShipmentPanel
                      getHeight={getHeight}
                      getWidth={getWidth}
                      setSelectedShipment={setSelectedShipment}
                      selectedShipment={selectedShipment}
                    />
                    <PaymentPanel
                      getHeight={getHeight}
                      getWidth={getWidth}
                      setSelectedPayment={setSelectedPayment}
                      selectedPayment={selectedPayment}
                    />
                  </>
                ) : null}
                {step == 3 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        marginTop: "20%",
                      }}
                    >
                      <div
                        style={{
                          height: getHeight(10),

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "#ff8a00",
                            fontSize: getWidth(3),
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                            textDecorationColor: "#EEEEEE",
                            letterSpacing: 1,
                            textDecorationThickness: 5,
                          }}
                        >
                          Thankyou&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div
                          style={{
                            fontSize: width / 110,
                            width: "100%",
                            textAlign: "left",
                            margin: 5,
                            fontWeight: 400,
                          }}
                        >
                          {`Order ID : ${generateCode()}`}
                        </div>
                        <div
                          style={{
                            color: "grey",
                            marginRight: 15,
                            fontSize: getWidth(0.9),
                            textAlign: "left",
                          }}
                        >
                          {`Your items will be delivered by ${selectedShipment.estimation} with ${selectedShipment.name}`}
                        </div>
                        <div
                          style={{
                            height: "30px",
                            width: "100%  ",
                            display: "flex",
                            alignItems: "center",
                            fontSize: getWidth(1),
                            marginTop: 20,
                            color: "#666666",
                            cursor:'pointer'
                          }}
                          onClick={()=>{
                            window.location.reload(false)
                          }}
                        >
                          <AiOutlineArrowLeft
                            size={30}
                            style={{ marginRight: 10 }}
                            color={"#666666"}
                          />
                          Go to homepage
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <Summary
                getWidth={getWidth}
                randomNumber={randomNumber}
                isChecked={isChecked}
                total={total}
                width={width}
                setStep={setStep}
                handleSubmit={handleSubmit}
                errorCheck={errorCheck}
                step={step}
                selectedPayment={selectedPayment}
                selectedShipment={selectedShipment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
