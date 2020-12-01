import {
  Image,
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react';
import Img from '../../imgs/product.jpg';
import CurrencyFormat from 'react-currency-format';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Rating from './Rating';

export default function Product() {
  return (
    <VStack borderWidth={1} py={4} px={4} mx={2} my={2}>
      <Image objectFit="contain" src={Img} />
      <VStack align="stretch" spacing={1}  pt={2}>
        <Text color="pink.500" isTruncated width={160}>KINDLE, KINDLE, KINDLE, KINDLE</Text>
        <Text fontWeight="bold" fontSize="xl" noOfLines={2}>
          Angry God (All Saints High Book 3)
        </Text>
        <Text color="gray.500">L.J. Shen</Text>
        <Rating/>
        <HStack align="baseline" >
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
        <HStack justify="space-between" pt={2}>
          <Text _hover={{ cursor: 'pointer' }}>ADD TO CART</Text>
          <Icon color="pink.500" as={FaHeart} />
        </HStack>
      </VStack>
    </VStack>
  );
}
