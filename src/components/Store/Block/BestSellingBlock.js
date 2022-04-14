import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api';
import LoadingDataSkeleton from '../../LoadingDataSkeleton';

export default function BestSellingBlock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchProducts({
        search: 'order=0',
        limit: 10,
      });
      setProducts(products);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout
      blockName="BestSelling Books"
      rightButtonName="View All"
      to="/store/search?order=0"
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
