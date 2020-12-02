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
import CurrencyFormat from 'react-currency-format';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/ShortedProduct';
import { Table, TData, THeading, TRow } from '../../components/Table';

export default function Cart() {
  return (
    <BlockLayout blockName="Cart">
      <Table
        minW={600}
        header={
          <TRow>
            {['Quantity', 'Product', 'Price', ''].map(item => (
              <THeading key={item}>{item}</THeading>
            ))}
          </TRow>
        }

        footer={
          <TRow>
            <TData
              colSpan="4"
              borderTopWidth={3}
              fontSize="4xl"
              fontWeight="bold"
              textAlign="right"
            >
              <CurrencyFormat
                value={29.95}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </TData>
          </TRow>
        }
      >
        <TRow>
          <TData>2</TData>
          <TData>
            <ShortedProduct />
          </TData>
          <TData>
            <Heading size="lg">
              <CurrencyFormat
                value={29.95}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </Heading>
          </TData>
          <TData>
            <HStack>
              <NumberInput defaultValue={1} min={1} value={10}>
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
          </TData>
        </TRow>
      </Table>
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
