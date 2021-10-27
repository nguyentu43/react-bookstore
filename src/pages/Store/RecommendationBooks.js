/* eslint-disable react-hooks/exhaustive-deps */
import {
  Icon,
  IconButton,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { fetchRecommendationProducts } from '../../api';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/Product';
import withAuth from '../../hocs/withAuth';
import LoadingData from '../../components/LoadingData';
import InfoEmptyList from '../../components/InfoEmptyList';

export default withAuth(function RecommendationBooks() {
  const [products, setProducts] = useState(null);
  const toast = useToast();

  async function handleRemoveWishlist(id) {
    try {
      await removeWishlist({ id });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

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
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4}>
        {products.map(item => (
          <Product key={item.id} {...item}/>
        ))}
      </SimpleGrid>
      {products.length === 0 && <InfoEmptyList />}
    </BlockLayout>
  );
});
