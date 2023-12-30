import {useState, useEffect} from 'react';
import logo from "../assets/logo.png";
import {
  VStack,
  Button,
  Text,
 Image,Container,
 Box,
Flex,

} from '@chakra-ui/react';
import { Sidebar } from '../components/Sidebar.jsx';
import {TestRules} from '../components/TestRules.jsx';
import {QuestionsForm} from '../components/QuestionsForm.jsx';
export const Questions = () => {
  const questions = [
    "I am not a worrier.",
    "I like to have a lot of people around me.",
    "I enjoy concentrating on a fantasy or daydream and exploring all its possibilities, letting it grow and develop.",
    "I try to be courteous to everyone I meet.",
    "I keep my belongings neat and clean.",
    "At times I have felt bitter and resentful.",
    "I laugh easily.",
    "I think it's interesting to learn and develop new hobbies.",
    "At times I bully or flatter people into doing what I want them to.",
    "I'm pretty good about pacing myself so as to get things done on time.",
    "When I'm under a great deal of stress, sometimes I feel like I'm going to pieces.",
    "I prefer jobs that let me work alone without being bothered by other people.",
    "I am intrigued by the patterns I find in art and nature.",
    "Some people think I'm selfish and egotistical.",
    "I often come into situations without being fully prepared.",
    "I rarely feel lonely or blue.",
    "I really enjoy talking to people.",
    "I believe letting students hear controversial speakers can only confuse and mislead them.",
    "If someone starts a fight, I'm ready to fight back.",
    "I try to perform all the tasks assigned to me conscientiously.",
    "I often feel tense and jittery.",
    "I like to be where the action is.",
    "Poetry has little or no effect on me.",
    "I'm better than most people, and I know it.",
    "I have a clear set of goals and work toward them in an orderly fashion.",
    "Sometimes I feel completely worthless.",
    "I shy away from crowds of people.",
    "I would have difficulty just letting my mind wander without control or guidance.",
    "When I've been insulted, I just try to forgive and forget.",
    "I waste a lot of time before settling down to work.",
    "I rarely feel fearful or anxious.",
    "I often feel as if I'm bursting with energy.",
    "I seldom notice the moods or feelings that different environments produce.",
    "I tend to assume the best about people.",
    "I work hard to accomplish my goals.",
    "I often get angry at the way people treat me.",
    "I am a cheerful, high-spirited person.",
    "I experience a wide range of emotions or feelings.",
    "Some people think of me as cold and calculating.",
    "When I make a commitment, I can always be counted on to follow through.",
    "Too often, when things go wrong, I get discouraged and feel like giving up.",
    "I don't get much pleasure from chatting with people.",
    "Sometimes when I am reading poetry or looking at a work of art, I feel a chill or wave of excitement.",
    "I have no sympathy for beggars.",
    "Sometimes I'm not as dependable or reliable as I should be.",
    "I am seldom sad or depressed.",
    "My life is fast-paced.",
    "I have little interest in speculating on the nature of the universe or the human condition.",
    "I generally try to be thoughtful and considerate.",
    "I am a productive person who always gets the job done.",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setIsTimerRunning(false);
          clearInterval(timerInterval);
          // Optionally, you can automatically submit the form when the timer reaches 0
          // handleSubmission();
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, isTimerRunning]);

  const handleOptionChange = (value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmission = () => {
    // Handle the submission logic here, e.g., send selectedOptions to a server
    console.log('Submitted:', selectedOptions);
  };

  const startTest = () => {
    setTestStarted(true);
    setIsTimerRunning(true);
  };

  return (
    <Flex minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
      <Sidebar />
      <Flex flex="1" direction="column" p="8" ml="300px">
        {/* Main Content */}
        <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
          <Container maxW="xl" centerContent>
            <Box
              display={'flex'}
              justifyContent="center"
              p={3}
              bg={'white'}
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text fontSize="4xl" fontFamily="Work Sans" color="black">
                Personality Test
              </Text>
            </Box>
          </Container>
          <VStack align="center" spacing="4" mt="4">
            <Image src={logo} alt="Personality Test Logo" boxSize="200px" />

            {!testStarted && <TestRules agreementChecked={agreementChecked} onAgreementChange={setAgreementChecked} />}

            {testStarted && currentQuestion < questions.length && (
              <QuestionsForm
                currentQuestion={currentQuestion}
                questions={questions}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
                onNextQuestion={handleNextQuestion}
                onSubmit={handleSubmission}
                timer={timer}
              />
            )}

            {!testStarted && (
              <Button
                colorScheme="teal"
                onClick={startTest}
                isDisabled={!agreementChecked}
                mt="4"
              >
                Start Test
              </Button>
            )}
          </VStack>
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