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
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">New password:</FormLabel>
            <Controller
              id="password"
              name="password"
              as={Input}
              type="password"
              defaultValue=""
              placeholder="Please enter your new password"
              rules={{ required: true }}
              control={control}
            />
            <FormErrorMessage>This field is requied*</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="green">
            Create new password
          </Button>
        </VStack>
      </form>
    );
  }
  