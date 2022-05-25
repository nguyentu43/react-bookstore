import {
  Button,
  Stack,
  VStack,
  Heading,
  Image,
  Box,
  SlideFade,
} from '@chakra-ui/react';
import Book from '../../imgs/books.png';
import CarouselWrapper from './Wrapper/CarouselWrapper';
import { Link } from 'react-router-dom';

function Item() {
  return (
    <Stack
      bg="pink.50"
      py={[12, 24]}
      px={[4, 6, 12]}
      direction={['column', 'column', 'row']}
      justify="space-between"
      align="center"
      spacing={4}
    >
      <VStack align="flex-start" spacing={3}>
        <SlideFade in={true} transition={{ delay: 5 }}>
          <Heading size="sm" color="gray.500">
            THE BOOKSTORE EDITORS'
          </Heading>
        </SlideFade>
        <SlideFade in={true} transition={{ delay: 8 }}>
          <Heading size="2xl" fontWeight="none">
            We Have
          </Heading>
          <Heading size="2xl">The Best Books</Heading>
        </SlideFade>
        <SlideFade in={true}>
          <Button as={Link} to="/store/search" colorScheme="blue">
            See Now
          </Button>
        </SlideFade>
      </VStack>
      <SlideFade in={true}>
        <Image
          loading="lazy"
          w="auto"
          h={['auto', 'auto', 180, 240]}
          src={Book}
        />
      </SlideFade>
    </Stack>
  );
}

export default function BannerCarousel() {
  return (
    <Box mb={4}>
      <CarouselWrapper lazyLoad="ondemand" responsive={null}>
        <Item />
      </CarouselWrapper>
    </Box>
  );
}
