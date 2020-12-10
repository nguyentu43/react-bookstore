import { Box } from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import DealProduct from '../DealProduct';

export default function WeekDealBlock({products}) {
  return (
    <Box bg="pink.50">
      <BlockLayout blockName="Deals of the Week">
        <CarouselWrapper slidesToShow={2} dots={false} arrows={true}>
          {products.map(item => <DealProduct key={item.id} {...item}/>)}
        </CarouselWrapper>
      </BlockLayout>
    </Box>
  );
}
