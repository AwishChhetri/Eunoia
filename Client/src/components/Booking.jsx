// Booking.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import image from "../assets/hello.jpg";
import { Box, Image, Text, Button, FormControl, Select, FormLabel, Input, VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Invoice from "./Invoice.jsx";

export const Booking = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    name: "",
    timing: "",
    age: "",
  });

  const [book, setBook] = useState({
    serviceName: "One to One Virtual Counselling",
    companyName: "Eunoia",
    img: `${image}`,
    price: 999,
    appointmentDetails: { ...appointmentDetails },
  });

  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const isFormCompleted =
      appointmentDetails.name &&
      appointmentDetails.age &&
      appointmentDetails.date &&
      appointmentDetails.timing;

    setFormCompleted(isFormCompleted);
  }, [appointmentDetails]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  const initPayment = async (paymentData) => {
    await loadRazorpayScript();

    const options = {
      key: "rzp_test_QwVFufHZbexRin",
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: book.serviceName,
      description: `Appointment for ${book.serviceName} on ${appointmentDetails.date} at ${appointmentDetails.timing}`,
      image: book.img,
      order_id: paymentData.id,
      handler: async (response) => {
        try {
          handlePaymentSuccess(response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error("Razorpay script not loaded");
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      setLoading(true);

      const verifyUrl = "https://eunoiaserver.onrender.com/api/payment/verify";
      const { data: verifyData } = await axios.post(verifyUrl, response);
      console.log(verifyData);

      setInvoiceData({
        serviceName: book.serviceName,
        companyName: book.companyName,
        amount: book.price,
        // Add other invoice details
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} p={4} width="auto">
      <Box borderWidth="1px" borderRadius="md" color="black" width="auto" justifyContent={"center"} p={4}>
        <Text fontSize="xl" mb={4}>
          Appointment Booking
        </Text>
        <Box className="book_container">
          <Image src={book.img} alt="book_img" className="book_img" width={500} />
          <Text className="book_name" fontWeight="bold" fontSize="lg">
            {book.serviceName}
          </Text>
          <Text className="book_companyName" color="gray.600">
            By {book.companyName}
          </Text>
          <Text className="book_price" color="green.500" fontWeight="bold">
            Price: <span>&#x20B9; {book.price}</span>
          </Text>
          <Text className="book_companyName" color="gray.600">
            Duration: 1hr
          </Text>

          <FormControl mt={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={appointmentDetails.name}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  name: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              value={appointmentDetails.age}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  age: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={appointmentDetails.date}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  date: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id="time" isRequired mt={4}>
            <FormLabel>Time</FormLabel>
            <Select
              placeholder="Select time"
              value={appointmentDetails.timing}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  timing: e.target.value,
                })
              }
            >
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 PM">10:00 AM</option>
              <option value="11:30 PM">11:30 AM</option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 PM">1:00 AM</option>
              <option value="2:30 PM">2:30 AM</option>
            </Select>
          </FormControl>

          <Button
            onClick={initPayment}
            colorScheme="teal"
            variant="solid"
            mt={4}
            disabled={!formCompleted || loading}
          >
            {loading ? <Spinner size="sm" /> : "Book"}
          </Button>
        </Box>
      </Box>

      {invoiceData && <Invoice invoiceData={invoiceData} />}
    </VStack>
  );
};
