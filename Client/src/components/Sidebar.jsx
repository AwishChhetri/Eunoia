import React, { useState } from 'react';
import { VStack, Box, Avatar, Text, Button, Flex, IconButton, useMediaQuery, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaFileAlt, FaUser, FaBrain, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(!useMediaQuery("(max-width: 600px)")[0]);
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <Flex
          direction="column"
          align="start"
          spacing="4"
          bg="teal.600"
          p="4"
          boxShadow="md"
          position="fixed"
          h="100vh"
          minW="250px"
          maxW={isMobile ? '80%' : '250px'} // Adjust max width for mobile view
          zIndex="100" // Ensure the sidebar is on top
        >
          {/* Close button in mobile view */}
          {isMobile && (
            <IconButton
              icon={<FaTimes />}
              size="md"
              aria-label="Close Sidebar"
              onClick={handleCloseSidebar}
              position="absolute"
              top="4"
              right="4"
            />
          )}

          {/* UserProfile */}
          <VStack align="start" mt={4} spacing="4">
            <Box>
              <Avatar size="md" name="John Doe" src="https://placekitten.com/g/100/100" />
              <Text mt={2}>John Doe</Text>
            </Box>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<Icon as={FaFileAlt} />}>
              <Link to="/intake-form" onClick={handleCloseSidebar}>
                Intake Form
              </Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<Icon as={FaUser} />}>
              <Link to="/personality-test" onClick={handleCloseSidebar}>
                Personality Test
              </Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<Icon as={FaBrain} />}>
              <Link to="/personality-test" onClick={handleCloseSidebar}>
                Mental Assessment
              </Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<Icon as={FaCalendarAlt} />}>
              <Link to="/appointment" onClick={handleCloseSidebar}>
                Book Session
              </Link>
            </Button>
            <Button
              colorScheme="red"  // Change this to your desired color scheme
              variant="outline"
              mt={4}
              size="md"
              w="100%"
              leftIcon={<Icon as={FaSignOutAlt} />}
              onClick={handleCloseSidebar}
            >
             <Link to="/" onClick={handleCloseSidebar}>
                Log Out
              </Link>
            </Button>
          </VStack>
        </Flex>
      )}

      {isMobile && (
        <IconButton
          icon={<FaBars />}
          size="md"
          aria-label="Toggle Sidebar"
          onClick={handleToggleSidebar}
          position="fixed"
          top="4"
          right="4"
          zIndex="99" // Ensure the toggle button is behind the sidebar
        />
      )}
    </>
  );
};
