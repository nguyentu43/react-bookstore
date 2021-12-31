import { Box, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

export default function ShortedOrderBlock({ items, total }) {
  return (
    <VStack
      align="stretch"
      mb={4}
      borderWidth={1}
      p={4}
      borderRadius="md"
      divider={<StackDivider />}
    >
      {items.map(({ id, name, slug, price, discount, quantity }) => (
        <HStack justify="space-between" key={id}>
          <Box>
            <Link to={'/store/book/' + slug}>
              <Text fontWeight="bold">{name}</Text>
            </Link>
            <Text as="small">x{quantity}</Text>
          </Box>
          <Text>
            <CurrencyFormat
              value={price * (1 - discount) * quantity}
              displayType={'text'}
              decimalScale={2}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Text>
        </HStack>
      ))}
      <HStack justify="space-between">
        <Text>Total</Text>
        <Text fontWeight="bold">
          <CurrencyFormat
            value={total}
            displayType={'text'}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </HStack>
    </VStack>
  );
}
