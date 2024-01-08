import React, { useState, useEffect } from "react";
import {
  HStack,
  Box,
  Text,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { loadRazorpayScript } from "../Payment/razorpayScript.jsx"; // You need to implement the script loader utility

// Payment component for demonstration purposes
const Payment = ({ onPaymentSuccess, onPaymentFailure }) => {
  const processPayment = async () => {
    const { Razorpay } = window;

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
      amount: 100 * 50, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for Appointment",
      image: "path/to/your/logo.png", // Replace with your company logo
      handler: function (response) {
        onPaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: document.getElementById("patientName").value,
        email: "patient@example.com", // Replace with the actual email or fetch dynamically
        contact: "9876543210", // Replace with the actual contact number or fetch dynamically
      },
      notes: {
        appointment_id: "YOUR_APPOINTMENT_ID", // Replace with your actual appointment ID
      },
      theme: {
        color: "#528FF0", // Replace with your preferred color
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  return (
    <Box mt={4}>
      <Text fontSize="lg">Payment Details</Text>
      <Button colorScheme="blue" onClick={processPayment}>
        Process Payment
      </Button>
    </Box>
  );
};

// IntakeForm component for demonstration purposes
const IntakeForm = ({ onFormSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    // Simulating form submission
    onFormSubmit();
    onClose();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} mb={4}>
        Fill Intake Form
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Intake Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add form fields here */}
            <FormControl>
              <FormLabel>Additional Form Field 1</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Additional Form Field 2</FormLabel>
              <Input type="text" />
            </FormControl>
            {/* Add more form fields as needed */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// BookingIntakeForm component
const BookingIntakeForm = ({ index, onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    // Simulating form submission
    onSubmit(index);
    onClose();
  };

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} ml={2}>
        Intake Form
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Intake Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <IntakeForm onFormSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Load Razorpay script dynamically
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js", () => {
      // Script loaded successfully
      console.log("Razorpay script loaded successfully");
    });
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBooking = async () => {
    const isVerified = Math.random() < 0.8;

    if (isVerified) {
      // Simulate an asynchronous payment process
      try {
        await simulatePayment(); // Simulated async payment process
        setBookingStatus("Booked");
        const newBooking = {
          name: document.getElementById("patientName").value,
          date: selectedDate,
          time: selectedTime,
          payment: "Paid",
          status: "Booked",
        };
        setBookings([...bookings, newBooking]);
      } catch (error) {
        setBookingStatus("Payment Failed");
      }
    } else {
      setBookingStatus("Pending Verification");
    }
  };

  const simulatePayment = () => {
    // Simulate a successful payment after a short delay (asynchronous)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() < 0.8; // Simulate success 80% of the time
        if (isSuccess) {
          resolve();
        } else {
          reject(new Error("Payment failed"));
        }
      }, 1000); // Simulated delay of 1000 milliseconds (1 second)
    });
  };

  const handlePaymentSuccess = (paymentId) => {
    const updatedBookings = [...bookings];
    const lastIndex = updatedBookings.length - 1;
    updatedBookings[lastIndex].payment = "Paid";
    updatedBookings[lastIndex].paymentId = paymentId;
    setBookings(updatedBookings);
    setBookingStatus("Paid and Booked");
    onClose(); // Close the payment modal
  };

  const handlePaymentFailure = () => {
    setBookingStatus("Payment Pending");
  };

  const handleIntakeFormSubmit = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Intake Form Submitted";
    setBookings(updatedBookings);
  };

  const generateInvoiceLink = () => {
    // Implement your logic to generate an invoice link and redirect the user
    console.log("Generating Invoice Link...");
    // For example, you can redirect to an external invoice generation service
    // window.location.href = "https://your-invoice-generation-service.com";
  };

  return (
    <div>
      <HStack align="start" spacing={4} p={isMobile ? 2 : 4}>
        <Box
          borderWidth="1px"
          borderRadius="md"
          color="black"
          width={isMobile ? "100%" : "70%"}
          justifyContent={"center"}
        >
          <Text fontSize="xl" mb={4}>
            Appointment Booking
          </Text>
          <FormControl id="patientName" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="John Doe" />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </FormControl>
          <FormControl id="time" isRequired>
            <FormLabel>Time</FormLabel>
            <Select
              placeholder="Select time"
              value={selectedTime}
              onChange={handleTimeChange}
            >
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:30 PM">11:30 PM</option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:30 PM">2:30 PM</option>
              {/* Add more options based on your available times */}
            </Select>
          </FormControl>
          <Button colorScheme="teal" onClick={handleBooking} mb={4}>
            Book Appointment
          </Button>
          {bookingStatus && (
            <Box mt={4}>
              <Text>
                Booking Status: <strong>{bookingStatus}</strong>
              </Text>
              {bookingStatus === "Pending Verification" && (
                <Payment
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentFailure={handlePaymentFailure}
                />
              )}
              {bookingStatus === "Booked" && (
                <BookingIntakeForm index={bookings.length - 1} onSubmit={handleIntakeFormSubmit} />
              )}
              {bookingStatus === "Payment Failed" && (
                <Text color="red">Payment failed. Please try again.</Text>
              )}
            </Box>
          )}
        </Box>
      </HStack>

      <Box borderWidth="1px" borderRadius="md" color="black" width="100%">
        <Text fontSize="xl" mb={4}>
          Booking List
        </Text>
        {bookings.length === 0 ? (
          <Text>No bookings yet.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.map((booking, index) => (
                <Tr key={index}>
                  <Td>{booking.name}</Td>
                  <Td>{booking.date}</Td>
                  <Td>{booking.time}</Td>
                  <Td>{booking.payment}</Td>
                  <Td>{booking.status}</Td>
                  <Td>
                    {booking.payment === "Paid" && (
                      <>
                        <Button colorScheme="purple" onClick={generateInvoiceLink}>
                          Generate Invoice
                        </Button>
                        <BookingIntakeForm index={index} onSubmit={handleIntakeFormSubmit} />
                      </>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </div>
  );
};
