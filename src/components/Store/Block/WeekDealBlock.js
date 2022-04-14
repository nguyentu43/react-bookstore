import { Box, useColorModeValue } from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import DealProduct from '../DealProduct';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api';
import LoadingDataSkeleton from '../../LoadingDataSkeleton';

export default function WeekDealBlock() {
  const bg = useColorModeValue('pink.50', 'pink.500');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchProducts({
        search: 'range=1-25',
        limit: 10,
      });
      setProducts(products);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <Box bg={bg}>
      <BlockLayout blockName="Deals of the Week">
        <LoadingDataSkeleton loading={loading} line={10}>
          <CarouselWrapper slidesToShow={2} dots={false} arrows={true}>
            {products.map(item => (
              <DealProduct key={item.id} {...item} />
            ))}
          </CarouselWrapper>
        </LoadingDataSkeleton>
      </BlockLayout>
    </Box>
  );
}
