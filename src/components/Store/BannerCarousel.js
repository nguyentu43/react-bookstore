import { Button, Stack, VStack, Heading, Image, Box } from '@chakra-ui/react';
import Books from '../../imgs/books.png';
import BannerBg from '../../imgs/banner-bg.jpg';
import CarouselWrapper from './Wrapper/CarouselWrapper';
import FadeIn from 'react-fade-in';

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
        <FadeIn delay={500}>
          <Heading size="sm" color="gray.500">
            THE BOOKWORM EDITORS'
          </Heading>
        </FadeIn>
        <FadeIn delay={600}>
          <Heading size="2xl" fontWeight="none">
            Featured Books of the
          </Heading>
          <Heading size="2xl">February</Heading>
        </FadeIn>
        <FadeIn delay={700}>
          <Button colorScheme="blue">See More</Button>
        </FadeIn>
      </VStack>
      <FadeIn delay={500}>
        <Image w="auto" h={['auto', 'auto', 180, 240]} src={Books} />
      </FadeIn>
    </Stack>
  );
}

export default function BannerCarousel() {
  return (
    <Box mb={4}>
      <CarouselWrapper responsive={null}>
        <Item />
        <Item />
      </CarouselWrapper>
    </Box>
  );
}
