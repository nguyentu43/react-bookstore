import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { fetchUserInfo, login } from '../../../api';
import { useAppContext } from '../../../context';
import graphQLClient from '../../../graphqlClient';
import { setCart, setAuth } from '../../../context/actions';

export default function LoginForm({ inDrawer, onCloseDraw }) {
  const { handleSubmit, errors, control } = useForm();
  const { dispatch } = useAppContext();
  const toast = useToast();

  const style = {};
  if (!inDrawer) {
    style.p = 4;
    style.borderWidth = 1;
  }

  async function handleLogin(data) {
    try {
      const { token } = await login({ ...data });
      localStorage.setItem('token', token);
      graphQLClient.setHeader('authorization', 'Bearer ' + token);
      const { user, cart } = await fetchUserInfo();
      dispatch(setAuth({ ...user, isLogin: true }));
      dispatch(setCart(cart));
      toast({ title: 'Login successfully', status: 'success' });
    } catch ({ response }) {
      toast({ title: response.errors[0].message, status: 'error' });
    }
  }

  return (
    <form onSubmit={handleSubmit(data => handleLogin(data))}>
      <VStack align="stretch" {...style} borderRadius="md">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Controller
            id="email"
            name="email"
            as={Input}
            placeholder="Please enter your email"
            defaultValue="admin@example.com"
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
            defaultValue="12345678"
            placeholder="Please enter your password"
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
        <Button
          as={Link}
          to="/store/register"
          onClick={onCloseDraw}
          colorScheme="green"
        >
          Register
        </Button>
        <Link to="/store/forgot-password" onClick={onCloseDraw}>
          <Text as="u" color="blue.500">
            Forgot your password?
          </Text>
        </Link>
      </VStack>
    </form>
  );
}
