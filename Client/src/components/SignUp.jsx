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
  Spinner,
} from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2'; // Import SweetAlert

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
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
    });
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      showErrorAlert('Please fill in all the required fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showErrorAlert('Password and Confirm Password must match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://eunoiaserver.onrender.com/signup', {
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

      showSuccessAlert('Registration successful!');
      history.push('/dash');
    } catch (error) {
      console.error('Error during registration:', error.message);
      showErrorAlert('Error during registration. Please try again.');
    } finally {
      setLoading(false);
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
        isLoading={loading} // Set isLoading prop based on loading state
        loadingText="Signing Up..." // Optional text to display during loading
      >
        {loading ? <Spinner /> : 'Sign Up'}
      </Button>
    </VStack>
  );
};

export default SignUp;