import { Box, useColorModeValue } from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import DealProduct from '../DealProduct';

export default function WeekDealBlock({products}) {

  const bg = useColorModeValue('pink.50', 'pink.500');
  return (
    <Box bg={bg}>
      <BlockLayout blockName="Deals of the Week">
        <CarouselWrapper slidesToShow={2} dots={false} arrows={true}>
          {products.map(item => <DealProduct key={item.id} {...item}/>)}
        </CarouselWrapper>
      </BlockLayout>
    </Box>
  );
}
