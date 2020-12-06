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
  const columns = useMemo(
    () => [
      { Header: 'Quantity', accessor: 'quantity' },
      {
        Header: 'Product',
        id: 'product',
        Cell: ({ row: { original } }) => <ShortedProduct />,
      },
      {
        Header: 'Price',
        id: 'price',
        accessor: 'price',
        Cell: ({ value }) => (
          <Heading size="lg">
            <CurrencyFormat
              value={value * 10}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Heading>
        ),
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: 'quantity',
        Cell: ({ value }) => (
          <HStack>
            <NumberInput defaultValue={1} min={1} value={value}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              size="sm"
              colorScheme="green"
              icon={<Icon as={FaCheck} />}
            />
            <IconButton
              size="sm"
              colorScheme="red"
              icon={<Icon as={FaTimes} />}
            />
          </HStack>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => [{ quantity: 10, name: 'abc', price: 29.9, action: 'moi' }],
    []
  );

  return (
    <BlockLayout blockName="Cart">
      <Table minW={600} columns={columns} data={data} showPagination={false} />
      <Button mt={4} as={Link} to="/store/checkout" colorScheme="red">
        Checkout
      </Button>
    </BlockLayout>
  );
}
