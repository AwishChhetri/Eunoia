// QuestionsForm.js
import React, { useState } from 'react';
import { FormControl, FormLabel, FormHelperText, RadioGroup, Radio, VStack, HStack, Button, Text } from '@chakra-ui/react';

export const QuestionsForm = ({ currentQuestion, questions, options, selectedOptions, onOptionChange, onNextQuestion, onSubmit, timer }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  
  
  const handleOptionChange = (optionValue) => {
    onOptionChange(optionValue);
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    if (isAnswerSelected) {
      setIsAnswerSelected(false);
      onNextQuestion();
    }
  };

  const handleSubmit = () => {
    if (isAnswerSelected) {
      onSubmit();
    }
  };

  return (
    <VStack w="100%" align="start" spacing="4">
    <FormControl as="fieldset" w="100%">
      <FormLabel fontSize={{ base: 'md', md: 'lg' }} color="teal.500" textAlign="start">
        {currentQuestion + 1}. {questions[currentQuestion]}
      </FormLabel>
      <RadioGroup value={selectedOptions[currentQuestion] || ''}>
        <VStack spacing="2" color="gray.800" align="flex-start">
          {Object.entries(options).map(([optionKey, optionValue]) => (
            <Radio
              key={optionValue}
              isChecked={selectedOptions[currentQuestion] === optionValue}
              value={optionValue}
              colorScheme="teal"
              size="md"
              onChange={() => handleOptionChange(optionValue)}
              style={{
                backgroundColor: selectedOptions[currentQuestion] === optionValue ? 'black' : 'white',
                color: selectedOptions[currentQuestion] === optionValue ? 'white' : 'black',
              }}
            >
              {optionKey}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <FormHelperText color="gray.400" textAlign="start">
        Choose the option that best describes your opinion.
      </FormHelperText>
    </FormControl>

    <VStack mt="4" spacing="4" w="100%" align="start">
      {currentQuestion === questions.length - 1 ? (
        <Button w="100%" colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      ) : (
        <Button w="100%" colorScheme="teal" onClick={handleNextQuestion}>
          Next Question
        </Button>
      )}
      <Text color="gray.800">{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60}`}</Text>
    </VStack>
  </VStack>
);
};