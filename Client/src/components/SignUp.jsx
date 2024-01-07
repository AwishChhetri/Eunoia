import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Select,
  VStack,
  Button,
} from "@chakra-ui/react";

import axios from 'axios'; // Make sure to install axios: npm install axios
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = () => setShow(!show);
  const history = useHistory();
  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      console.log('Please fill in all the required fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      console.log('Password and Confirm Password must match.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        email,
        password,
        phoneNumber,
        age,
        maritalStatus,
        gender,
        password,
      });
  
      const { token } = response.data;
  
      localStorage.setItem('token', token);
  
      setName("");
      setEmail("");
      setPhoneNumber("");
      setAge("");
      setMaritalStatus("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
  
      console.log('Registration successful!');
      history.push('/dash');
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  
  // Add a function to check token expiration
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Token is not available, user needs to log in
      return true;
    }
  
    try {
      const decodedToken = jwt.decode(token);
  
      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, user needs to log in
        return true;
      }
  
      // Token is still valid
      return false;
    } catch (error) {
      // Token is invalid, user needs to log in
      return true;
    }
  };
  
  // Example usage: check token expiration before making requests
  const someRequest = async () => {
    if (isTokenExpired()) {
      console.log('Token is expired. Redirect to login page.');
      // Redirect to the login page
      history.push('/login');
      return;
    }
  
    // Continue with your request logic here
    try {
      const response = await axios.get('http://example.com/some-api-endpoint', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Handle the response
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error making API request:', error.message);
    }
  };
  

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="phoneNumber" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="number"
          placeholder="Enter Your 10 Digit Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormControl>

      <FormControl id="age" isRequired>
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          placeholder="30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </FormControl>

      <FormControl id="maritalStatus" isRequired>
        <FormLabel>Marital Status</FormLabel>
        <Input
          type="text"
          placeholder="Single/Married"
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
        />
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel>Gender</FormLabel>
        <Select
          placeholder="Select Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </Select>
      </FormControl>

      {/* <FormControl id="pic" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.value)}
        />
      </FormControl> */}

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
