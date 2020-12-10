import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaCartPlus, FaHeart, FaRegUser } from 'react-icons/fa';
import { addItemToCart } from '../../../api';
import { useAppContext } from '../../../context';

export default function AddProductForm({ id }) {
  const {
    state: {
      cart: { items },
    },
    dispatch,
  } = useAppContext();
  const { handleSubmit, errors, register } = useForm();

  async function handleAddProduct(data) {
    const exists = items.find(item => item.id === id);
    const input = {
      quantity: 1,
      id,
    };
    if (exists) {
      input.quantity = Number(data.quantity) + exists.quantity;
    }

    try {
      const { cart } = await addItemToCart({ input });
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(data => handleAddProduct(data))}>
      <HStack>
        <NumberInput defaultValue={1} min={1} w={100} max={20}>
          <NumberInputField name="quantity" ref={register} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <IconButton
          icon={<Icon as={FaCartPlus} />}
          type="submit"
          colorScheme="blue"
        />
        <IconButton color="pink.500" icon={<Icon as={FaHeart} />} />
      </HStack>
    </form>
  );
}
