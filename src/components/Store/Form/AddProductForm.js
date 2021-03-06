import {
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { addItemToCart, addWishlist } from '../../../api';
import { useAppContext } from '../../../context';
import { setCart } from '../../../context/actions';

export default function AddProductForm({ id }) {
  const {
    state: {
      cart: { items },
      auth: { isLogin },
    },
    dispatch,
  } = useAppContext();
  const { handleSubmit, register } = useForm();
  const toast = useToast();

  async function handleAddProduct(data) {
    if (!isLogin) {
      toast({ status: 'info', title: 'Login to add book to cart' });
      return;
    }

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
      dispatch(setCart(cart));
      toast({ title: 'The book is added to cart' });
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  async function handleAddWishlist() {
    if (!isLogin) {
      toast({ status: 'info', title: 'Login to add book to wishlist' });
      return;
    }
    try {
      await addWishlist({ id });
      toast({ title: 'The book is added to wishlist' });
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
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
        <IconButton
          color="pink.500"
          onClick={handleAddWishlist}
          icon={<Icon as={FaHeart} />}
        />
      </HStack>
    </form>
  );
}
