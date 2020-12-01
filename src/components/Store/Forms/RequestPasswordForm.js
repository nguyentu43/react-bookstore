import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import { useForm, Controller } from 'react-hook-form';
  import { Link } from 'react-router-dom';
  
  export default function RequestPasswordForm() {
    const { handleSubmit, errors, control } = useForm();
  
    return (
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <VStack align="stretch">
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Controller
              id="email"
              name="email"
              as={Input}
              placeholder="Please enter your email"
              defaultValue=""
              rules={{ required: true, min: 6 }}
              control={control}
            />
            <FormErrorMessage>This field is requied*</FormErrorMessage>
          </FormControl>
          <Button type="submit">
            Send Email
          </Button>
        </VStack>
      </form>
    );
  }
  