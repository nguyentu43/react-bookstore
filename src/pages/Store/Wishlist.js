/* eslint-disable react-hooks/exhaustive-deps */
import {
  VStack,
  Icon,
  IconButton,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { getWishlist, removeWishlist } from '../../api';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/ShortedProduct';
import withAuth from '../../hocs/withAuth';
import LoadingData from '../../components/LoadingData';
import InfoEmptyList from '../../components/InfoEmptyList';

export default withAuth(function Wishlist() {
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
      const { products } = await getWishlist();
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
    <BlockLayout blockName="Wishlist">
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4}>
        {products.map(item => (
          <VStack key={item.id} borderWidth={1} p={2} align="stretch">
            <ShortedProduct {...item} />
            <IconButton
              onClick={() => handleRemoveWishlist(item.id)}
              icon={<Icon as={FaRegTrashAlt} />}
            />
          </VStack>
        ))}
      </SimpleGrid>
      {products.length === 0 && <InfoEmptyList />}
    </BlockLayout>
  );
});
