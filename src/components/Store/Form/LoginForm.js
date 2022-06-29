import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
  useBoolean
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserInfo, login, loginWithProvider } from '../../../api';
import graphQLClient from '../../../graphqlClient';
import { setCart, setAuth } from '../../../redux/actions';
import { useGoogleLogin } from 'react-google-login';

export default function LoginForm({ inDrawer, onCloseDraw }) {
  const { handleSubmit, errors, control } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loadingButtonState, loadingButtonAction] = useBoolean(false);
  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    async onSuccess({ profileObj: { name, email } }) {
      try {
        const { token } = await loginWithProvider({ name, email });
        localStorage.setItem('token', token);
        graphQLClient.setHeader('authorization', 'Bearer ' + token);
        const { user, cart } = await fetchUserInfo();
        dispatch(setAuth({ ...user, isLogin: true }));
        dispatch(setCart(cart));
        toast({ title: 'Login successfully', status: 'success' });
      } catch ({ response }) {
        toast({ title: response.errors[0].message, status: 'error' });
      }
    },
    onFailure(_) {
      toast({ title: 'Login with Google Error', status: 'error' });
    },
  });

  const style = {};
  if (!inDrawer) {
    style.p = 4;
    style.borderWidth = 1;
  }

  async function handleLogin(data) {
    try {
      loadingButtonAction.on();
      const { token } = await login({ ...data });
      localStorage.setItem('token', token);
      graphQLClient.setHeader('authorization', 'Bearer ' + token);
      const { user, cart } = await fetchUserInfo();
      dispatch(setAuth({ ...user, isLogin: true }));
      dispatch(setCart(cart));
      toast({ title: 'Login successfully', status: 'success' });
    } catch ({ response }) {
      toast({ title: response.errors[0].message, status: 'error' });
    } finally{
      loadingButtonAction.off();
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
        <Button isLoading={loadingButtonState} type="submit" colorScheme="blue" variant="outline">
          Login
        </Button>
        <Button
          type="button"
          colorScheme="red"
          variant="outline"
          onClick={signIn}
        >
          Login with Google
        </Button>
        <Button
          as={Link}
          to="/store/register"
          onClick={onCloseDraw}
          colorScheme="green"
          variant="outline"
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
