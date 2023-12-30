import {
    Container,
    VStack,
    HStack,
    Button,
    Box,
    Text,
    Flex,
    Spacer,
  } from '@chakra-ui/react';
  
  import {Sidebar} from "../components/Sidebar.jsx"
  import {UserProfile} from "../pages/UserProfile.jsx"
  export const IntakeForm = () => {
    return (
      <Flex minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
        {/* Sidebar */}
        <Sidebar/>
  
        {/* Main Content */}
        <Flex flex="1" direction="column" p="8" ml="300px">
          {/* Main Content */}
          <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
            {/* Questions*/}
            <UserProfile/>
          </Box>
  
          {/* Footer component */}
          <Box mt="auto" textAlign="center">
            <Text fontSize="sm" color="gray.500">
              &copy; 2023 Naruto Dashboard. All rights reserved.
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  };
  