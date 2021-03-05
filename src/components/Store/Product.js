import { Image, Text, VStack, HStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { useMemo } from 'react';
import AddProductForm from './Form/AddProductForm';
import { Link } from 'react-router-dom';

export default function Product({
  inSlider = false,
  id,
  name,
  price,
  discount,
  images,
  authors,
  slug,
}) {
  const style = useMemo(() => {
    if (inSlider) {
      return {
        borderRadius: 'md',
        borderWidth: 1,
        p: 4,
        m: 2,
      };
    } else {
      return {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        p: 4,
      };
    }
  }, [inSlider]);
  return (
    <VStack {...style}>
      <Image objectFit="contain" w={120} h={200} src={images[0].secure_url} />
      <VStack align="stretch" spacing={1} pt={2}>
        <Text
          to={'/store/book/' + slug}
          as={Link}
          fontWeight="bold"
          fontSize="xl"
          noOfLines={2}
          minH="60px"
        >
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
        <AddProductForm id={id} />
      </VStack>
    </VStack>
  );
}
