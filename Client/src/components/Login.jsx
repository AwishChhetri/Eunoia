import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  VStack,
  Button,
} from '@chakra-ui/react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => setShow(!show);
  const history = useHistory();
  const [sessionTimeout, setSessionTimeout] = useState(null);

  useEffect(() => {
    // Clear session timeout on component unmount
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [sessionTimeout]);

  const setSessionTimeoutCallback = () => {
    const sessionTimeoutId = setTimeout(() => {
      // Clear localStorage and redirect to login page
      localStorage.removeItem('token');
      history.push('/');
    }, 30 * 60 * 1000); // Set timeout for 30 minutes (adjust as needed)

    setSessionTimeout(sessionTimeoutId);
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post('https://eunoiaserver.onrender.com/api/login', {
        email,
        password,
      });

      // Assuming your server returns a token in the response
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Set session timeout
      setSessionTimeoutCallback();

      // Redirect to the dashboard or perform other actions
      console.log('Login successful!');
      history.push('/dash');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
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
        Login
      </Button>
    </VStack>
  );
};

export default Login;
