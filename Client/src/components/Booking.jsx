import React, { useState, useEffect } from "react";
import {
  VStack,
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
import { Payment } from "../Payment/payment.jsx";
import { loadRazorpayScript } from "../Payment/razorpayScript";

const IntakeForm = ({ onFormSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
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
            <FormControl>
              <FormLabel>Additional Form Field 1</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Additional Form Field 2</FormLabel>
              <Input type="text" />
            </FormControl>
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

const BookingIntakeForm = ({ index, onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    onSubmit(index);
    onClose();
  };

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} mt={2}>
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
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    loadRazorpayScript(() => {
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
    setBookingStatus(null);

    const isVerified = Math.random() < 0.8;

    if (isVerified) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setBookingStatus("Not Booked");
        const newBooking = {
          name: patientName,
          date: selectedDate,
          time: selectedTime,
          payment: "Paid",
          status: "Booked",
          orderId: generateOrderId(),
        };
        setBookings([...bookings, newBooking]);
      } catch (error) {
        setBookingStatus("Payment Failed");
      }
    } else {
      setBookingStatus("Pending Verification");
    }
  };

  const handlePaymentSuccess = (paymentId, orderId) => {
    const updatedBookings = [...bookings];
    const lastIndex = updatedBookings.length - 1;
    updatedBookings[lastIndex].payment = "Paid";
    updatedBookings[lastIndex].paymentId = paymentId;
    updatedBookings[lastIndex].orderId = orderId;
    setBookings(updatedBookings);
    setBookingStatus("Paid and Booked");
    onClose();
  };

  const handlePaymentFailure = () => {
    setBookingStatus("Payment Pending");
  };

  const handleIntakeFormSubmit = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Intake Form Submitted";
    setBookings(updatedBookings);
  };

  const generateOrderId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const generateInvoiceLink = () => {
    console.log("Generating Invoice Link...");
  };

  return (
    <VStack color="black" spacing={4} p={isMobile ? 2 : 4}>
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
          <Input
            type="text"
            placeholder="John Doe"
            onChange={(e) => setPatientName(e.target.value)}
          />
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
                patientName={patientName}
              />
            )}
            {bookingStatus === "Booked" && (
              <BookingIntakeForm
                index={bookings.length - 1}
                onSubmit={handleIntakeFormSubmit}
              />
            )}
            {bookingStatus === "Payment Failed" && (
              <Text color="red">Payment failed. Please try again.</Text>
            )}
          </Box>
        )}
      </Box>

      <Box borderWidth="1px" borderRadius="md" color="black" width="100%" overflowX="auto">
        <Text fontSize="xl" mb={4}>
          Booking List
        </Text>
        {bookings.length === 0 ? (
          <Text>No bookings yet.</Text>
        ) : (
          <Table variant="simple">
            <Thead display={{ base: 'none', md: 'table-header-group' }}>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th>Order ID</Th>
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
                  <Td>{booking.orderId || "-"}</Td>
                  <Td>
                    {booking.payment === "Paid" && (
                      <>
                        <Button
                          colorScheme="purple"
                          onClick={generateInvoiceLink}
                          display={{ base: 'none', md: 'block' }}
                        >
                          Generate Invoice
                        </Button>
                        <BookingIntakeForm
                          index={index}
                          onSubmit={handleIntakeFormSubmit}
                          display={{ base: 'none', md: 'block' }}
                        />
                      </>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </VStack>
  );
};