import {
  Image,
  Text,
  VStack,
  HStack,
  Flex,
  Progress,
  Stack,
} from '@chakra-ui/react';
import Img from '../../imgs/product.jpg';
import CurrencyFormat from 'react-currency-format';

export default function DealProduct() {
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
      <Image objectFit="contain" src={Img} />
      <VStack align="stretch" spacing={1}>
        <Text color="pink.500">KINDLE</Text>
        <Text fontWeight="bold" fontSize="xl" noOfLines={2}>
          Angry God (All Saints High Book 3)
        </Text>
        <Text color="gray.500">L.J. Shen</Text>
        <HStack align="baseline">
          <Text fontSize="xl" fontWeight="bold">
            <CurrencyFormat
              value={1.3}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />{' '}
          </Text>
          <Text as="s" fontSize="sm">
            <CurrencyFormat
              value={1.75}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Text>
        </HStack>
        <Flex justify="space-between">
          <Text>Already Sold: 11</Text>
          <Text>Available: 3</Text>
        </Flex>
        <Progress borderRadius="md" value={(9 / 11) * 100} height={3} colorScheme="pink" />
      </VStack>
    </Stack>
  );
}
