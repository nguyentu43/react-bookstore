import {
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
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
      <SimpleGrid
        columns={[1, 2, 2, 6]}
        px={[4, 6, 12]}
        py={16}
        borderTopWidth={1}
        gap={8}
      >
        <GridItem colSpan={[1, 2]}>
          <Heading>Bookstore</Heading>
          <Text mt={6}>
            1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
          </Text>
          <Text mt={6}>
            sale@bookstore.example
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
      </SimpleGrid>
      <Stack
        direction={['column', 'column', 'row']}
        align="center"
        px={[4, 6, 12]}
        py={8}
        borderTopWidth={1}
        justify="space-between"
      >
        <Text>© {new Date().getFullYear()} Bookstore. All rights reserved</Text>
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
