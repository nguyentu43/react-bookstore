import { Box } from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import DealProduct from '../DealProduct';

export default function WeekDealBlock() {
  return (
    <Box bg="pink.50">
      <BlockLayout blockName="Deals of the Week" rightButtonName="View All">
        <CarouselWrapper slidesToShow={2} dots={false} arrows={true}>
          <DealProduct />
          <DealProduct />
          <DealProduct />
        </CarouselWrapper>
      </BlockLayout>
    </Box>
  );
}
