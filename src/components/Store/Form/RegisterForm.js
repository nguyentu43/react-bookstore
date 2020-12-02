import {
    Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

export default function RegisterForm() {
  const { handleSubmit, errors, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <VStack align="stretch" p={4} borderWidth={1} borderRadius="md">
      <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Fullname:</FormLabel>
          <Controller
            id="name"
            name="name"
            as={Input}
            placeholder="Please enter your name"
            defaultValue=""
            rules={{ required: true, min: 6 }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
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
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Controller
            id="password"
            name="password"
            as={Input}
            type="password"
            defaultValue=""
            placeholder="Please enter your password"
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="green">Register</Button>
      </VStack>
    </form>
  );
}
