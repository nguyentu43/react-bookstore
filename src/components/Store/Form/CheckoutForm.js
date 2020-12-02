import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import csc from 'country-state-city';
import { useMemo, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const { handleSubmit, errors, control } = useForm();
  const countries = useMemo(() => csc.getAllCountries(), []);
  const [states, setStates] = useState(null);
  const [cardError, setCardError] = useState(false);

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

  async function createOrder({}) {
    if (!stripe || !elements) return;

    setCardError(false);
    const cardElement = elements.getElement(CardElement);

    // const { error, paymentIntent } = await stripe.confirmCardPayment(
    //   "1234",
    //   {
    //     payment_method: {
    //       card: cardElement,
    //       billing_details: {
    //       },
    //     }
    //   }
    // );

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      //billing_details: billingDetails,
    });

    if (error) {
      if (error.type === 'validation_error') {
          setCardError(true);
      }
    } else {
        
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
        <FormControl>
          <FormLabel htmlFor="address2">Address 2 (Optional):</FormLabel>
          <Controller
            id="address2"
            name="address2"
            as={Input}
            placeholder="Please enter your addres 2"
            defaultValue=""
            control={control}
          />
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
            rules={{required: true, pattern: /[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}/ }}
          />
          <FormErrorMessage>This field is required and phone number format</FormErrorMessage>
        </FormControl>
        <HStack>
          <FormControl isInvalid={errors.country}>
            <FormLabel htmlFor="country">Country:</FormLabel>
            <Controller
              id="country"
              name="country"
              placeholder="Please enter your country"
              defaultValue=""
              rules={{ required: true }}
              control={control}
              render={props => (
                <Select
                  value={props.value}
                  onChange={value => {
                    if (value.target.value) {
                      props.onChange(value);
                      setStates(csc.getStatesOfCountry(value.target.value));
                    }
                  }}
                >
                  <option>Please enter your country</option>
                  {countries.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <FormControl isInvalid={errors.state}>
            <FormLabel htmlFor="state">State/City:</FormLabel>
            <Controller
              id="state"
              name="state"
              defaultValue=""
              rules={{ required: true }}
              control={control}
              render={props => (
                <Select
                  isDisabled={!states}
                  value={props.value}
                  onChange={value => {
                    props.onChange(value);
                  }}
                >
                  <option>Please enter your state</option>
                  {states &&
                    states.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Payment: </FormLabel>
          <Box
            p={3}
            borderWidth={cardError ? 2 : 1}
            borderColor={cardError && 'red.500'}
            borderRadius={8}
          >
            <CardElement
              onChange={e => console.log(e)}
              options={cardElementOptions}
            />
          </Box>
        </FormControl>
        <Button colorScheme="green" type="submit">
          Order
        </Button>
      </VStack>
    </form>
  );
}
