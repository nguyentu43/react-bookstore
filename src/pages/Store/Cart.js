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
import { useMemo } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/ShortedProduct';
import Table from '../../components/Table';

export default function Cart() {

  const columns = useMemo(() => [
    { Header: "Quantity", accessor: 'quantity' },
    { Header: "Product" },
    { Header: "Price" },
    { Header: "Action" }
  ], []);

  const data = useMemo(() => [
    { quanity: 10,  }
  ], []);

  return (
    <BlockLayout blockName="Cart">
      <Table minW={600} columns={columns} data={data}/>
      <Button
        mt={4}
        as={Link}
        to="/store/checkout"
        colorScheme="red"
      >
        Checkout
      </Button>
    </BlockLayout>
  );
}
