import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';
import { useEffect, useState } from 'react';
import { fetchRecommendationProducts } from '../../../api';
import LoadingDataSkeleton from '../../LoadingDataSkeleton';

export default function RecommendationBlock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchRecommendationProducts({
        offset: 0,
        limit: 12,
      });
      setProducts(products);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout
      blockName="Recommendation Books For You"
      rightButtonName="View All"
      to="/store/recommendation"
    >
      <LoadingDataSkeleton loading={loading} line={10}>
        <CarouselWrapper slidesToShow={5} dots={false} arrows={true}>
          {products.map(item => (
            <Product inSlider={true} {...item} key={item.id} />
          ))}
        </CarouselWrapper>
      </LoadingDataSkeleton>
    </BlockLayout>
  );
}
