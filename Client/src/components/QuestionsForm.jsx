// QuestionsForm.js
import React from 'react';
import { FormControl, FormLabel, FormHelperText, RadioGroup, Radio, VStack, HStack, Button, Text } from '@chakra-ui/react';

export const QuestionsForm = ({ currentQuestion, questions, options, selectedOptions, onOptionChange, onNextQuestion, onSubmit, timer }) => (
  <VStack w="80%" align="start" spacing="8">
    <FormControl as="fieldset" w="100%">
      <FormLabel fontSize="lg" color="teal.500" textAlign="start">
        {currentQuestion + 1}. {questions[currentQuestion]}
      </FormLabel>
      <RadioGroup value={selectedOptions[currentQuestion] || ''}>
        <VStack spacing="4" color="gray.800" align="flex-start">
          {Object.entries(options).map(([optionKey, optionValue]) => (
            <Radio
              key={optionValue}
              isChecked={selectedOptions[currentQuestion] === optionValue}
              value={optionValue}
              colorScheme="teal"
              size="lg"
              onChange={() => onOptionChange(optionValue)}
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
      <FormHelperText color="gray.400" textAlign="start">Choose the option that best describes your opinion.</FormHelperText>
    </FormControl>

    <HStack mt="8" spacing="4" justify="start" align="start">
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
