/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleGrid, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchRecommendationProducts } from '../../api';
import InfoEmptyList from '../../components/InfoEmptyList';
import LoadingData from '../../components/LoadingData';
import BlockLayout from '../../components/Store/BlockLayout';
import withAuth from '../../hocs/withAuth';
import Product from '../../components/Store/Product';

export default withAuth(function RecommendationBooks() {
  const [products, setProducts] = useState(null);
  const toast = useToast();

  async function fetchData() {
    try {
      const { products } = await fetchRecommendationProducts({
        offset: 0,
        limit: 30,
      });
      setProducts(products);
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (products === null) return <LoadingData />;

  return (
    <BlockLayout blockName="Recommendation">
      <SimpleGrid columns={[1, 2, 4, 5]} borderTopWidth={1} borderLeftWidth={1}>
        {products.map(item => (
          <Product key={item.id} {...item} />
        ))}
      </SimpleGrid>
      {products.length === 0 && <InfoEmptyList />}
    </BlockLayout>
  );
});
