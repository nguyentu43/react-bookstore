import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { checkout, getPaymentCode, refundStripe } from '../../../api';
import { useHistory } from 'react-router-dom';
import { setCart } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const phoneReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

export default function CheckoutForm() {
  const { handleSubmit, errors, control } = useForm();
  const [cardError, setCardError] = useBoolean(false);
  const [loadingButton, setButton] = useBoolean(false);
  const { push } = useHistory();

  const { items, total } = useSelector(state => state.cart);
  const { email } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toast = useToast();

  const stripe = useStripe();
  const elements = useElements();
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  async function refund(paymentID) {
    try {
      await refundStripe({ paymentID });
    } catch (error) {
      toast({ status: 'error', title: 'Checkout Error. Try again!' });
    }
  }

  async function createOrder(data) {
    if (!stripe || !elements) return;

    setCardError.off();
    const cardElement = elements.getElement(CardElement);

    let paymentID;

    try {
      setButton.on();
      const { code } = await getPaymentCode({ total: Math.round(total * 100) });
      const { error, paymentIntent } = await stripe.confirmCardPayment(code, {
        payment_method: {
          card: cardElement,
          billing_details: {
            ...data,
            email,
          },
        },
      });

      if (error) {
        if (error.type === 'validation_error') {
          setCardError.on();
        } else {
          toast({ status: 'error', title: 'Stripe error' });
        }
      } else {
        paymentID = paymentIntent.id
        await checkout({
          input: {
            ...data,
            paymentID,
            total,
            items: items.map(({ id, quantity, price, discount }) => ({
              id,
              quantity,
              price,
              discount,
            })),
          },
        });
        dispatch(setCart([]));
        push('/store');
        toast({ title: 'Your order will be processed as soon as possible' });
      }
    } catch (error) {
      toast({ status: 'error', title: 'Checkout Error. Try again!' });
      if (paymentID) await refund(paymentID);
    } finally {
      setButton.off();
    }
  }

  return (
    <form onSubmit={handleSubmit(data => createOrder(data))}>
      <VStack align="flex-start" p={4} borderWidth={1} borderRadius="md">
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Fullname:</FormLabel>
          <Controller
            id="name"
            name="name"
            as={Input}
            placeholder="Please enter your fullname"
            defaultValue=""
            rules={{ required: true, min: 6 }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.address}>
          <FormLabel htmlFor="address">Address:</FormLabel>
          <Controller
            id="address"
            name="address"
            as={Input}
            placeholder="Please enter your address"
            defaultValue=""
            rules={{ required: true, min: 6 }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.phone}>
          <FormLabel htmlFor="Phone">Phone:</FormLabel>
          <Controller
            id="phone"
            name="phone"
            as={Input}
            placeholder="Please enter your phone number"
            defaultValue=""
            control={control}
            rules={{
              required: true,
              pattern: phoneReg,
            }}
          />
          <FormErrorMessage>
            This field is required and phone number format
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Payment: </FormLabel>
          <Box
            p={3}
            borderWidth={cardError ? 2 : 1}
            borderColor={cardError && 'red.500'}
            borderRadius={8}
          >
            <CardElement options={cardElementOptions} />
          </Box>
        </FormControl>
        <Button isLoading={loadingButton} colorScheme="green" type="submit">
          Order
        </Button>
      </VStack>
    </form>
  );
}
