import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import Img from '../../imgs/product.jpg';

export default function ShortedProduct() {
  return (
    <HStack align="flex-start" spacing={4}>
      <Image w={70} objectFit="contain" src={Img} />
      <VStack align="flex-start" >
        <Text>Blindside (Michael Bennett Book 12)</Text>
        <Text>
          <CurrencyFormat
            value={29.95}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </VStack>
    </HStack>
  );
}
