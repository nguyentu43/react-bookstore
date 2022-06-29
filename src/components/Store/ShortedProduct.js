import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

export default function ShortedProduct({
  name,
  price,
  discount,
  images = [],
  slug,
}) {
  return (
    <HStack
      align="flex-start"
      spacing={4}
      _hover={{ cursor: 'pointer' }}
      as={Link}
      title={slug}
      to={'/store/book/' + slug}
    >
      <Image
        loading="lazy"
        w={70}
        objectFit="contain"
        alt={slug}
        src={images[0].secure_url}
      />
      <VStack align="flex-start">
        <Text fontWeight="bold">{name}</Text>
        <Text>
          <CurrencyFormat
            value={price * (1 - discount)}
            displayType={'text'}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'$'}
          />
          {discount > 0 && (
            <Text as="s" fontSize="sm" marginLeft={2}>
              <CurrencyFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </Text>
          )}
        </Text>
      </VStack>
    </HStack>
  );
}
