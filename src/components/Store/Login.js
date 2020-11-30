import {
    Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlineLogin} from 'react-icons/ai';
import { FaQuestion } from 'react-icons/fa';

export default function Login() {
  const { handleSubmit, errors, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <VStack align="flex-start">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Controller
            id="email"
            name="email"
            as={Input}
            placeholder="Please enter your email"
            rules={{ required: true, min: 6 }}
            control={control}
          />
          <FormErrorMessage>This field is requied*</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Password:</FormLabel>
          <Controller
            id="email"
            name="email"
            as={Input}
            type="password"
            placeholder="Please enter your password"
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is requied*</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" leftIcon={<Icon as={AiOutlineLogin}/>}>Login</Button>
        <Button colorScheme="orange" leftIcon={<Icon as={FaQuestion}/>}>Forgot Password?</Button>
      </VStack>
    </form>
  );
}
