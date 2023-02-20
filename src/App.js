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
    width: "90%",

    backgroundColor: "white",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "2px 10px 20px rgba(255, 138, 0, 0.1)",
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
const StepCheckout = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fffae6;
  border-radius: 35px;
  width: 500px;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 1;
  

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
`;
const CheckoutLayoutWrapper = styled.div`
  background-color: #ffffff;
  padding: 0 20px 20px 40px;
  border-radius: 4px;
  min-height: 500px;
  box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
`;
const StepItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepNumber = styled.div`
  border-radius: 50px;
  font-size: 18px;
  font-weight: 500;
  width: 35px;
  height: 35px;
  background: ${(props) => (props.active ? "#ff8a00" : "#ffe4b8")};
  color: ${(props) => (props.active ? "#fff" : "#ff8a00")};
  margin-right: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  flex-wrap:wrap;

  @media only screen and (max-width: 600px) {
    font-size: 12px;
    font-weight: 400;
    width: 20px;
    height: 20px;
  }
`;

const StepTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #ff8a00;

  @media only screen and (max-width: 600px) {
    font-size: 12px;
    font-weight: 400;
  }
`;
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  gap: 30px;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const IndicatorContainer = styled.div`
  margin-top: -30px;
  width: 60%;
  height: 15%;
  background-color: #fffae6;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    margin-top: 0;
    width: 100%;
    border-radius: 0;
    background-color: rgb(255, 250, 230);
  }
`;

const TopIndicatorNumber = styled.div`
  background-color: #ff8a00;
  border-radius: 50px;
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
const ShipmentList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  flex-direction:column;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ShipmentListItem = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const PaymentList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  flex-direction:column;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const PaymentListItem = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
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
            fontSize: "36px",
          }}
        >
          Summary
        </div>
        <div
          style={{
            color: "grey",
            margin: 5,
            fontSize: "14px",
          }}
        >
          {randomNumber + " items purchased"}
        </div>
        {selectedPayment || selectedShipment ? (
          <div
            style={{
              color: "grey",
              width: "60%",
              border: "1px solid #cccccc",
              marginTop: 10,
              marginLeft: 5,
            }}
          />
        ) : null}
        {step > 1 && selectedShipment ? (
          <div>
            <div
              style={{
                fontSize: "14px",
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
                fontSize: "16px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                fontSize: "14px",
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
                fontSize: "14px",
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
          height: "40%",
          marginTop: 18,
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
              fontSize: "14px",
              color: "#676767",
              width: "78%",
            }}
          >
            Cost of goods
          </div>
          <div
            style={{
              fontSize: "14px",
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
                fontSize: "14px",
                color: "#676767",
                width: "88%",
              }}
            >
              Dropshipping Fee
            </div>
            <div
              style={{
                fontSize: "14px",
                width: "100px",
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
                fontSize: "14px",
                color: "#676767",
                width: "90%",
              }}
            >
              <b> {selectedShipment?.name}</b> shipment
            </div>
            <div
              style={{
                fontSize: "14px",
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
              fontSize: "24px",
              color: "#ff8a00",
              width: "50%",
              fontWeight: "bold",
            }}
          >
            Total
          </div>
          <div
            style={{
              fontSize: "24px",
              width: "70%",
              fontWeight: "bold",
              color: "#ff8a00",
              textAlign: "right",
            }}
          >
            {total?.toLocaleString()}
          </div>
        </div>
        {step < 3 ? (
          <div
            style={{
              fontSize: "18px",
              width: "100%",
              color: "white",
              backgroundColor:
                step !== 2
                  ? "#ff8a00"
                  : selectedPayment && selectedShipment
                  ? "#ff8a00"
                  : "#cccccc",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "1px 2px 9px #F4AAB9",
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={() => {
               let check;
              if(isChecked){
              check = Object.values(errorCheck).every((v) => v === false);
              }else{
              check=  Object.values(errorCheck).slice(0, 3).every(val => val === false)
              }
              
              console.log(errorCheck,"ERRORCHECK")
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
              : selectedPayment
              ? `Pay with ${selectedPayment?.name}`
              : "Choose payment method"}
          </div>
        ) : null}
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
    <ShipmentList>
      <div
        style={{
          height: getHeight(10),
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#ff8a00",
            fontSize: "36px",
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

      <ShipmentListItem>
        {shipmentMethods?.map((v, i) => {
          return (
            <div
              cursor
              style={{
                fontSize: '13px',
                backgroundColor: "white",
                width: '180px',
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
                  selectedShipment?.id == v?.id ? "#e7faf0" : "#ffffff",
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
      </ShipmentListItem>
    </ShipmentList>
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
<PaymentList>
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
            fontSize: '36px',
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
      <PaymentListItem>
        {paymentMethods?.map((v, i) => {
          return (
            <div
              cursor
              style={{
                fontSize: '13px',
                backgroundColor: "white",
                width:'180px',
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
    </PaymentListItem>
    </PaymentList>
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
          fontSize: '36px',
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

const TopBanner = (props) => {
  const {step}=props
  return (
    <IndicatorContainer>
      <StepItem>
        <StepNumber>1</StepNumber>
        <StepTitle>Delivery</StepTitle>
      </StepItem>
      <FaChevronRight
        size={20}
        color={"#ff8a00"}
        fontWeight={"bold"}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <StepItem>
        <StepNumber>2</StepNumber>
        <StepTitle>Payment</StepTitle>
      </StepItem>
      <FaChevronRight
        size={20}
        color={"#ff8a00"}
        fontWeight={"bold"}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <StepItem>
        <StepNumber>3</StepNumber>
        <StepTitle>Finish</StepTitle>
      </StepItem>
    </IndicatorContainer>
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
        let totalpriceofproducts
    if(randomNumber){
      if(selectedShipment){
totalpriceofproducts =
        randomNumber * 130000 + selectedShipment?.price;
      }else{
        totalpriceofproducts= randomNumber*130000
      }
      
    if (isChecked) {
      totalpriceofproducts = totalpriceofproducts + 5900;
      setTotal(totalpriceofproducts);
    } else {
      console.log(totalpriceofproducts,"TOTAL PRICE")
      setTotal(totalpriceofproducts);
    }
  }
  }, [isChecked,selectedShipment]);
  return (
    <div className="App">
      
      <div style={styles.container}>
        <div style={styles.checkoutBanner}>
          <TopBanner step={step}/>

          <div style={{ width: "90%", height: "100%" }}>
            
            <div
              style={{
                height: "30px",
                width: "120px",
                display: "flex",
                alignItems: "center",
                fontSize: '14px',
                cursor:step==2?'pointer':null,
                marginTop:10,
                marginBottom:10
              }}
              onClick={()=>{
setStep(1)
              }}
            >
              {step<3?    <AiOutlineArrowLeft size={30} style={{ marginRight: 10 }} />:null}
          
              {step==1?'Back to cart':step==2?'Back to delivery':null}
            </div>
            <ContentWrapper
            >
              <div>
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
                        marginTop: "40px",
                      }}
                    >
                      <div
                        style={{
                          height: getHeight(14),

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "#ff8a00",
                            fontSize: '36px',
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
                            fontSize: '14px',
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
                            fontSize: '14px',
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
                            fontSize: '14px',
                            marginTop: 20,
                            color: "#666666",
                            cursor:'pointer'
                          }}
                          onClick={()=>{
                            window.location.reload(false)
                          }}
                        >
                          <AiOutlineArrowLeft
                            size={14}
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
            </ContentWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
