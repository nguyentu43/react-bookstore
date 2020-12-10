import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';

export default function ShortedProduct({
  name,
  price,
  discount,
  images = [],
  slug,
}) {
  const history = useHistory();

  return (
    <HStack
      align="flex-start"
      spacing={4}
      _hover={{ cursor: 'pointer' }}
      onClick={() => {
        history.push('/store/book/' + slug);
      }}
    >
      <Image w={70} objectFit="contain" src={images[0].secure_url} />
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
        </Text>
      </VStack>
    </HStack>
  );
}
