import { VStack, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
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

  async function handleRemoveWishlist(id) {
    try {
      await removeWishlist({ id });
      fetchData();
    } catch (error) {
      throw error;
    }
  }

  async function fetchData() {
    try {
      const { products } = await getWishlist();
      setProducts(products);
    } catch (error) {
      throw error;
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
      {products.length === 0 && <InfoEmptyList/>}
    </BlockLayout>
  );
});
