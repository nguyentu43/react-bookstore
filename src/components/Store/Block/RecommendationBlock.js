import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';
import { useEffect, useState } from 'react';
import { fetchRecommendationProducts } from '../../../api';

export default function RecommendationBlock() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchRecommendationProducts({
        offset: 0,
        limit: 12,
      });
      setProducts(products);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout
      blockName="Recommendation Books For You"
      rightButtonName="View All"
      to="/store/recommendation"
    >
      <CarouselWrapper slidesToShow={5} dots={false} arrows={true}>
        {products.map(item => (
          <Product inSlider={true} {...item} key={item.id} />
        ))}
      </CarouselWrapper>
    </BlockLayout>
  );
}
