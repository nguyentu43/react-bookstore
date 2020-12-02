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

export default function LoginForm({inDrawer}) {
  const { handleSubmit, errors, control } = useForm();

  const style = {};
  if(!inDrawer){
    style.p = 4;
    style.borderWidth = 1;
  }

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <VStack align="stretch" {...style} borderRadius="md">
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
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
        <Button as={Link} to="/store/register" colorScheme="green">
          Create an account
        </Button>
        <Link to="/store/forgot-password" >
          <Text as="u" color="blue.500">Forgot your password?</Text>
        </Link>
      </VStack>
    </form>
  );
}
