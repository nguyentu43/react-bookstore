import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../../api';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/ShortedProduct';
import Table from '../../components/Table';
import { useAppContext } from '../../context';

function QuantityInput({ quantity, id, changeQuantity }) {
  const [value, setValue] = useState(quantity);

  function handleUpdateQuantity() {
    changeQuantity(Number(value), id);
  }

  return (
    <>
      <NumberInput
        defaultValue={1}
        onChange={e => setValue(e)}
        min={1}
        value={value}
        w={70}
        size="sm"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <IconButton
        size="sm"
        onClick={handleUpdateQuantity}
        colorScheme="green"
        icon={<Icon as={FaCheck} />}
      />
    </>
  );
}

export default function Cart() {
  const {
    state: {
      cart: { items, total },
    },
    dispatch,
  } = useAppContext();

  function setCart(items) {
    dispatch({ type: 'SET_CART', payload: items });
  }

  async function changeQuantity(quantity, id) {
    try {
      const { cart } = await addItemToCart({ input: { quantity, id } });
      setCart(cart);
    } catch (error) {
      alert(error);
    }
  }

  async function deleteProduct(productID) {
    try {
      const { cart } = await removeItemFromCart({ productID });
      setCart(cart);
    } catch (error) {
      alert(error);
    }
  }

  const columns = useMemo(
    () => [
      { Header: 'Quantity', accessor: 'quantity' },
      {
        Header: 'Product',
        id: 'product',
        Cell: ({ row: { original } }) => <ShortedProduct {...original} />,
      },
      {
        Header: 'Price',
        id: 'price',
        accessor: 'price',
        Cell: ({
          value,
          row: {
            original: { discount, quantity },
          },
        }) => (
          <Heading size="lg">
            <CurrencyFormat
              value={value * (1 - discount) * quantity}
              displayType={'text'}
              decimalScale={2}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Heading>
        ),
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: 'id',
        Cell: ({
          value,
          row: {
            original: { quantity },
          },
          deleteProduct,
          changeQuantity,
        }) => (
          <HStack>
            <QuantityInput
              quantity={quantity}
              id={value}
              changeQuantity={changeQuantity}
            />
            <IconButton
              size="sm"
              colorScheme="red"
              onClick={() => deleteProduct(value)}
              icon={<Icon as={FaTimes} />}
            />
          </HStack>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => items, [items]);

  return (
    <BlockLayout blockName="Cart">
      <Table
        minW={600}
        columns={columns}
        action={{ changeQuantity, deleteProduct }}
        data={data}
        showPagination={false}
      />
      <Heading mt={4} textAlign="right">
        Total:{' '}
        <CurrencyFormat
          value={total}
          displayType={'text'}
          decimalScale={2}
          thousandSeparator={true}
          prefix={'$'}
        />
      </Heading>
      <Button mt={4} as={Link} to="/store/checkout" colorScheme="red">
        Checkout
      </Button>
    </BlockLayout>
  );
}
