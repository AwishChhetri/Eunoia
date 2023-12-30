// QuestionForm.js
import React from 'react';
import { FormControl, FormLabel, FormHelperText, RadioGroup, Radio, VStack, HStack, Button, Text } from '@chakra-ui/react';

export const QuestionsForm = ({ currentQuestion, questions, selectedOptions, onOptionChange, onNextQuestion, onSubmit, timer }) => (
  <VStack w="80%">
    <FormControl as="fieldset">
      <FormLabel fontSize="lg" color="black">
        {currentQuestion + 1}. {questions[currentQuestion]}
      </FormLabel>
      <RadioGroup defaultValue="3" name={`question-${currentQuestion}`}>
        <VStack align="start" spacing="2" color="gray.800">
          {[1, 2, 3, 4, 5].map((value) => (
            <Radio
              key={value}
              value={String(value)}
              colorScheme="teal"
              size="lg"
              isChecked={selectedOptions[currentQuestion] === String(value)}
              onChange={() => onOptionChange(String(value))}
            >
              {value === 1
                ? 'Strongly Agree'
                : value === 2
                ? 'Agree'
                : value === 3
                ? 'Neutral'
                : value === 4
                ? 'Disagree'
                : 'Strongly Disagree'}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <FormHelperText color="gray.400">Choose the option that best describes your opinion.</FormHelperText>
    </FormControl>

    <HStack mt="4">
      {currentQuestion === questions.length - 1 ? (
        <Button colorScheme="teal" onClick={onSubmit}>
          Submit
        </Button>
      ) : (
        <Button colorScheme="teal" onClick={onNextQuestion}>
          Next Question
        </Button>
      )}
      <Text color="gray.800">{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60}`}</Text>
    </HStack>
  </VStack>
);
