import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';

export default function BestSellingBlock({ products }) {
  return (
    <BlockLayout blockName="BestSelling Books" rightButtonName="View All" to="/store/search?order=0">
      <CarouselWrapper slidesToShow={5} dots={false} arrows={true}>
        {products.map(item => (
          <Product inSlider={true} {...item} key={item.id} />
        ))}
      </CarouselWrapper>
    </BlockLayout>
  );
}
