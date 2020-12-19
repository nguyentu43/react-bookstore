import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

export default function PromoCodeForm() {
  const { handleSubmit, errors, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <HStack p={4} justify="space-between" borderRadius="md" borderWidth={1}>
        <FormControl isInvalid={errors.promoCode}>
          <Controller
            id="promoCode"
            name="promoCode"
            as={Input}
            placeholder="Please enter your promo code"
            defaultValue=""
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" type="submit">
          Redeem
        </Button>
      </HStack>
    </form>
  );
}
