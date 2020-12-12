import { VStack, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { getWishlist, removeWishlist } from '../../api';
import BlockLayout from '../../components/Store/BlockLayout';
import ShortedProduct from '../../components/Store/ShortedProduct';

export default function Wishlist() {
  const [products, setProducts] = useState([]);

  async function handleRemoveWishlist(id){
    try{
      const {result} = await removeWishlist({id});
      alert(result);
      fetchData();
    }
    catch(error){
      alert(error);
    }
  }

  async function fetchData() {
    try {
      const { products } = await getWishlist();
      setProducts(products);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (products.length === 0) return 'loading';

  return (
    <BlockLayout blockName="Wishlist">
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4}>
        {products.map(item => (
          <VStack key={item.id} borderWidth={1} p={2} align="stretch">
            <ShortedProduct  {...item} />
            <IconButton onClick={() => handleRemoveWishlist(item.id)} icon={<Icon as={FaRegTrashAlt}/>}/>
          </VStack>
        ))}
      </SimpleGrid>
    </BlockLayout>
  );
}
