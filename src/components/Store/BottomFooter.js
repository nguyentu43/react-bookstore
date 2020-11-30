import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaCashRegister,
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaPaypal,
  FaPinterest,
  FaStripe,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

export default function BottomFooter() {
  return (
    <>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(6, 1fr)']}
        px={[8, 12, 24]}
        py={16}
        borderTopWidth={1}
        gap={8}
      >
        <GridItem colSpan={[1, 2]}>
          <Heading>Bookworm</Heading>
          <Text mt={6}>
            1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
          </Text>
          <Text mt={6}>
            sale@bookworm.com
            <br />
            +1 246-345-0695
          </Text>
          <HStack mt={8} spacing={8}>
            <Icon as={FaInstagram} />
            <Icon as={FaFacebook} />
            <Icon as={FaYoutube} />
            <Icon as={FaTwitter} />
            <Icon as={FaPinterest} />
          </HStack>
        </GridItem>
        <GridItem>
          <Heading size="lg">Explore</Heading>
          <VStack mt={6} align="flex-start">
            <Text>About us</Text>
            <Text>Site map</Text>
            <Text>Bookmarks</Text>
            <Text>Sign in/Join</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <Heading size="lg">Explore</Heading>
          <VStack mt={6} align="flex-start">
            <Text>About us</Text>
            <Text>Site map</Text>
            <Text>Bookmarks</Text>
            <Text>Sign in/Join</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <Heading size="lg">Explore</Heading>
          <VStack mt={6} align="flex-start">
            <Text>About us</Text>
            <Text>Site map</Text>
            <Text>Bookmarks</Text>
            <Text>Sign in/Join</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <Heading size="lg">Explore</Heading>
          <VStack mt={6} align="flex-start">
            <Text>About us</Text>
            <Text>Site map</Text>
            <Text>Bookmarks</Text>
            <Text>Sign in/Join</Text>
          </VStack>
        </GridItem>
      </Grid>
      <Stack
        direction={['column', 'column', 'row']}
        align="center"
        px={[8, 12, 24]}
        py={8}
        borderTopWidth={1}
        justify="space-between"
      >
        <Text>©2020 Book Worm. All rights reserved</Text>
        <HStack spacing={[8, 12]}>
          <Icon w={10} h={10} as={FaCcMastercard} />
          <Icon w={10} h={10} as={FaPaypal} />
          <Icon w={10} h={10} as={FaStripe} />
          <Icon w={10} h={10} as={FaCcVisa} />
        </HStack>
      </Stack>
    </>
  );
}
