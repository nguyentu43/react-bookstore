import { Button, Stack, VStack, Heading, Image, Box } from '@chakra-ui/react';
import Book from '../../imgs/books.png';
import CarouselWrapper from './Wrapper/CarouselWrapper';
import { Link } from 'react-router-dom';
import DelayFade from '../Admin/DelayFade';

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
        <DelayFade>
          <Heading size="sm" color="gray.500">
            THE BOOKSTORE EDITORS'
          </Heading>
        </DelayFade>
        <DelayFade delay={0.5}>
          <Heading size="2xl" fontWeight="none">
            We Have
          </Heading>
          <Heading size="2xl">The Best Books</Heading>
        </DelayFade>
        <DelayFade delay={0.8}>
          <Button as={Link} to="/store/search" colorScheme="blue">
            Explorer
          </Button>
        </DelayFade>
      </VStack>
      <DelayFade delay={0.3}>
        <Image
          loading="lazy"
          w="auto"
          h={['auto', 'auto', 180, 240]}
          src={Book}
          alt="books"
        />
      </DelayFade>
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
