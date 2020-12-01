
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';

export default function BestSellingBlock() {

  return (
    <BlockLayout blockName="BestSelling Books" rightButtonName="View All">
      <CarouselWrapper
        slidesToShow={5}
        dots={false}
        arrows={true}
      >
        {
            [0,0,0,0,0,0].map((items, index) => (<Product index={index} key={index} />))
        }
        
      </CarouselWrapper>
    </BlockLayout>
  );
}
