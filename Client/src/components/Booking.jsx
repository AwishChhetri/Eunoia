import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBooking = () => {
    // You can implement your booking logic here
    // For simplicity, we'll just set the status to "Booked"
    setBookingStatus("Booked");
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" color="black">
      <Text fontSize="xl" mb={4}>
        Appointment Booking
      </Text>
      <FormControl id="date" mb={4}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </FormControl>
      <FormControl id="time" mb={4}>
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
        </Box>
      )}
    </Box>
  );
};

const YourComponent = () => {
  return (
    <Flex justify="center" align="center" h="100vh" color="black">
      <AppointmentBooking />
    </Flex>
  );
};

export default YourComponent;
