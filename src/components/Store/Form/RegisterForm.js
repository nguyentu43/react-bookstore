import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
  useBoolean
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { fetchUserInfo, register } from '../../../api';
import graphQLClient from '../../../graphqlClient';
import { useDispatch } from 'react-redux';
import { setCart, setAuth } from '../../../redux/actions';

export default function RegisterForm() {
  const { handleSubmit, errors, control } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loadingButtonState, loadingButtonAction] = useBoolean(false);

  async function handleRegister(data) {
    try {
      loadingButtonAction.on();
      const { token } = await register({ input: data });
      localStorage.setItem('token', token);
      graphQLClient.setHeader('authorization', 'Bearer ' + token);
      const { user, cart } = await fetchUserInfo();
      dispatch(setAuth({ ...user, isLogin: true }));
      dispatch(setCart(cart));
      toast({ title: 'Register successfully', status: 'success' });
    } catch ({ response }) {
      toast({ title: response.errors[0].message, status: 'error' });
    } finally{
      loadingButtonAction.off();
    }
  }

  return (
    <form onSubmit={handleSubmit(data => handleRegister(data))}>
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
        <Button type="submit" colorScheme="green" variant="outline">
          Create account
        </Button>
        <Button
          isLoading={loadingButtonState}
          as={Link}
          to="/store/login"
          colorScheme="blue"
          variant="outline"
        >
          Login
        </Button>
      </VStack>
    </form>
  );
}
