import { Button, Stack, VStack, Heading, Image } from '@chakra-ui/react';
import Books from '../../imgs/books.png';
import BannerBg from '../../imgs/banner-bg.jpg';
import CarouselWrapper from './Wrapper/CarouselWrapper';

function Item() {
  return (
    <Stack
      bgImage={'url(' + BannerBg + ')'}
      py={[12, 24]}
      px={[4, 6, 12]}
      direction={['column', 'column', 'row']}
      justify="space-between"
      align="center"
      spacing={4}
    >
      <VStack align="flex-start" spacing={3}>
        <Heading size="sm" color="gray.500">
          THE BOOKWORM EDITORS'
        </Heading>
        <Heading size="2xl" fontWeight="none">
          Featured Books of the
        </Heading>
        <Heading size="2xl">February</Heading>
        <Button colorScheme="blue">See More</Button>
      </VStack>
      <Image w="auto" h={['auto', 'auto', 180, 240]} src={Books} />
    </Stack>
  );
}

export default function BannerCarousel() {
  return (
    <CarouselWrapper responsive={null}>
      <Item />
      <Item />
    </CarouselWrapper>
  );
}
