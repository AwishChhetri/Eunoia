import React from 'react';
import { VStack, Box, Avatar, Text, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div>
      <VStack align="start" spacing="4" bg="teal.600" p="70" boxShadow="md" position="fixed" h="100vh">
        {/* UserProfile */}
        <Box>
          <Avatar size="md" name="John Doe" src="https://placekitten.com/g/100/100">
            {/* You can add AvatarBadge or other components here */}
          </Avatar>
          <Text mt={2}>John Doe</Text>
        </Box>
        <VStack align="start" mt={50} spacing="8">
          <Button colorScheme="teal" variant="solid" size="md">
            <Link to="/intake-form">Intake Form</Link>
          </Button>
          <Button colorScheme="teal" variant="solid" size="md">
            <Link to="/personality-test">Personality Test</Link>
          </Button>
          <Button colorScheme="teal" variant="solid" size="md">
           <Link to="/"> Mental Assessment</Link>
          </Button>
          <Button colorScheme="teal" variant="solid" size="md">
           <Link to="/appointment"> Book Session</Link>
          </Button>
          <Button colorScheme="white" variant="outline" mt={59} size="md">
            Log out
          </Button>
        </VStack>
      </VStack>
    </div>
  );
};
