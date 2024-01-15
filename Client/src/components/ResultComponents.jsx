import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { InfoIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import {
  Flex,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  VStack,
  Heading,
  Image,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  HStack,
} from '@chakra-ui/react';

import image from '../assets/personality.png';

export const ResultComponent = () => {
  const handleInfoClick = (trait, text) => {
    Swal.fire({
      icon: 'info',
      title: trait,
      text: text,
    });
  };

  return (
    <Box
      p="4"
      bgGradient="linear(to-r, #36D1DC, #5B86E5)"
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      color="teal"
    >
      <VStack spacing="4">
        <Heading fontSize={{ base: '2xl', md: '4xl' }} color="white">
          NEO Personality Inventory
        </Heading>

        <VStack align="center" justify="center">
          <Image src={image} alt="Trophy" boxSize="100px" width={100} />
          <Badge
            ml="2"
            colorScheme="yellow"
            variant="outline"
            fontSize={{ base: 'md', md: 'lg' }}
            textTransform="uppercase"
          >
            Personality Master
          </Badge>
        </VStack>

        <Box
          p="4"
          bg="whiteAlpha.900"
          borderRadius="md"
          mt="4"
          w={{ base: '100%', md: '80%' }}
          boxShadow="md"
        >
          <VStack spacing={{ base: '4', md: '8' }}>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.800">
              Your Personality Traits:
            </Text>

            {/* Add CircularProgress for each personality trait */}
            <HStack spacing={{ base: '2', md: '8' }}>
              <CircularProgress value={40} color="green.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Openness</CircularProgressLabel>
              </CircularProgress>

              <CircularProgress value={60} color="blue.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Conscientiousness</CircularProgressLabel>
              </CircularProgress>
              <CircularProgress value={40} color="orange.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Extraversion</CircularProgressLabel>
              </CircularProgress>
            </HStack>

            <HStack spacing={{ base: '4', md: '8' }}>
              <CircularProgress value={60} color="purple.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Agreeableness</CircularProgressLabel>
              </CircularProgress>
              <CircularProgress value={60} color="red.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Neuroticism</CircularProgressLabel>
              </CircularProgress>
            </HStack>
          </VStack>

          <Flex direction={{ base: 'column', md: 'row' }} justify={'space-between'} mt="4">
            {/* Adding InfoIcon with onClick event handler */}
            <Flex
              onClick={() =>
                handleInfoClick(
                  'Openness',
                  `High scorers are often inventive, open-minded, and ready to embrace new ideas or experiences. They thrive in creative endeavors, seek adventure, and are generally more willing to entertain unconventional thoughts or lifestyles. Conversely, individuals scoring low on openness might prefer stability, routine, and conventional approaches to life. `
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="green.400">Openness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  'Conscientiousness',
                  `This trait reflects how reliable, organized, and diligent someone tends to be. Individuals scoring high are often efficient, methodical, and motivated to achieve their goals. They excel in planning, tend to be punctual, and value structure. On the other hand, lower scorers might struggle with maintaining organization, preferring spontaneity over planning.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="blue.400">Conscientiousness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  'Extraversion',
                  ` High scorers in extraversion are social butterflies - outgoing, energetic, and enthusiastic in social settings. They thrive on interaction, tend to be assertive, and often take leadership roles. On the flip side, those scoring low on extraversion may find solace in solitude, enjoy quiet activities, and might feel drained by extensive social interaction.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="orange.400">Extraversion</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  'Agreeableness',
                  `Individuals high in agreeableness are compassionate, empathetic, and cooperative. They prioritize harmony in relationships, display altruistic behavior, and tend to be considerate of others' feelings. Lower scorers might be more skeptical, competitive, or assertive, potentially valuing personal goals over social harmony.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="purple.400">Agreeableness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  'Neuroticism',
                  'This trait relates to emotional stability. Individuals scoring high in neuroticism often experience emotional fluctuations, anxiety, and tend to be more sensitive to stress. They might be prone to worry, self-doubt, and mood swings. Conversely, those with low neuroticism tend to be more composed, resilient, and less reactive to stressful situations.'
                )
              }
              cursor="pointer"
              align="center"
            >
              <InfoIcon />
              <Text color="red.400">Neuroticism</Text>
            </Flex>
          </Flex>
        </Box>

        <Box
          p="4"
          bg="whiteAlpha.900"
          borderRadius="md"
          mt="4"
          w={{ base: '100%', md: '80%' }}
          boxShadow="md"
        >
          <VStack spacing={{ base: '4', md: '8' }} align="start">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.800">
              Your Personality Traits:
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>

              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>

              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>
            </List>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ResultComponent;
