import { Image, Text, VStack, HStack, Stack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import AddProductForm from './Form/AddProductForm';

export default function DealProduct({
  id,
  name,
  price,
  discount,
  images,
  authors,
  slug,
}) {
  return (
    <Stack
      direction={['column', 'column', 'row']}
      borderWidth={1}
      borderRadius="md"
      px={4}
      py={4}
      mx={2}
      spacing={5}
      bg="white"
    >
      <Image h={60} objectFit="contain" src={images[0].secure_url} />
      <VStack align="stretch" spacing={1}>
        <Text fontWeight="bold" fontSize="xl" noOfLines={2}>
          {name}
        </Text>
        <Text color="gray.500">
          {authors.map(author => author.name).join(', ')}
        </Text>
        <HStack align="baseline">
          <Text fontSize="xl" fontWeight="bold">
            <CurrencyFormat
              value={price * (1 - discount)}
              decimalScale={2}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />{' '}
          </Text>
          {discount > 0 && (
            <Text as="s" fontSize="sm">
              <CurrencyFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </Text>
          )}
        </HStack>
        <AddProductForm id={id}/>
      </VStack>
    </Stack>
  );
}
