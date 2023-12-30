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
  const questionsWithOptions = {
    "I am not a worrier.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I like to have a lot of people around me.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I enjoy concentrating on a fantasy or daydream and exploring all its possibilities, letting it grow and develop.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I try to be courteous to everyone I meet.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I keep my belongings neat and clean.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "At times I have felt bitter and resentful.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I laugh easily.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I think it's interesting to learn and develop new hobbies.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "At times I bully or flatter people into doing what I want them to.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I'm pretty good about pacing myself so as to get things done on time.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "When I'm under a great deal of stress, sometimes I feel like I'm going to pieces.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I prefer jobs that let me work alone without being bothered by other people.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I am intrigued by the patterns I find in art and nature.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Some people think I'm selfish and egotistical.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I often come into situations without being fully prepared.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I rarely feel lonely or blue.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I really enjoy talking to people.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I believe letting students hear controversial speakers can only confuse and mislead them.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "If someone starts a fight, I'm ready to fight back.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I try to perform all the tasks assigned to me conscientiously.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I often feel tense and jittery.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I like to be where the action is.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Poetry has little or no effect on me.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I'm better than most people, and I know it.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I have a clear set of goals and work toward them in an orderly fashion.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Sometimes I feel completely worthless.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I shy away from crowds of people.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I would have difficulty just letting my mind wander without control or guidance.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "When I've been insulted, I just try to forgive and forget.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I waste a lot of time before settling down to work.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I rarely feel fearful or anxious.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I often feel as if I'm bursting with energy.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I seldom notice the moods or feelings that different environments produce.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I tend to assume the best about people.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I work hard to accomplish my goals.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I often get angry at the way people treat me.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I am a cheerful, high-spirited person.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I experience a wide range of emotions or feelings.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Some people think of me as cold and calculating.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "When I make a commitment, I can always be counted on to follow through.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Too often, when things go wrong, I get discouraged and feel like giving up.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I don't get much pleasure from chatting with people.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Sometimes when I am reading poetry or looking at a work of art, I feel a chill or wave of excitement.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I have no sympathy for beggars.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "Sometimes I'm not as dependable or reliable as I should be.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I am seldom sad or depressed.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "My life is fast-paced.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I have little interest in speculating on the nature of the universe or the human condition.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I generally try to be thoughtful and considerate.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
    "I am a productive person who always gets the job done.": { 'Strongly Agree': 1, Agree: 2, Neutral: 3, Disagree: 4, 'Strongly Disagree': 5 },
  };
  

  const questions = Object.keys(questionsWithOptions);

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
          handleRestartTest(); // Restart the test when the timer reaches 0
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

  const handleRestartTest = () => {
    // Reset the timer and other state variables to restart the test
    setTimer(600);
    setIsTimerRunning(false);
    setTestStarted(false);
    setAgreementChecked(false);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
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
                options={questionsWithOptions[questions[currentQuestion]]}
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