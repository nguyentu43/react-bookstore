import {
  Button,
  Stack,
  VStack,
  Heading,
  Image,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import Book from '../../imgs/books.png';
import CarouselWrapper from './Wrapper/CarouselWrapper';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';

function Item() {
  const bg = useColorModeValue('pink.50', 'pink.500');

  return (
    <Stack
      bg={bg}
      py={[12, 24]}
      px={[4, 6, 12]}
      direction={['column', 'column', 'row']}
      justify="space-between"
      align="center"
      spacing={4}
    >
      <VStack align="flex-start" spacing={3}>
        <FadeIn delay={500}>
          <Heading size="sm" color="gray.500">
            THE BOOKSTORE EDITORS'
          </Heading>
        </FadeIn>
        <FadeIn delay={600}>
          <Heading size="2xl" fontWeight="none">
            Featured Books of the
          </Heading>
          <Heading size="2xl">February</Heading>
        </FadeIn>
        <FadeIn delay={700}>
          <Button as={Link} to="/store" colorScheme="blue">
            See More
          </Button>
        </FadeIn>
      </VStack>
      <FadeIn delay={500}>
        <Image w="auto" h={['auto', 'auto', 180, 240]} src={Book} />
      </FadeIn>
    </Stack>
  );
}

export default function BannerCarousel() {
  return (
    <Box mb={4}>
      <CarouselWrapper lazyLoad="ondemand" responsive={null}>
        <Item />
        <Item />
      </CarouselWrapper>
    </Box>
  );
}
