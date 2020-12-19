import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api';
import ShortedProduct from '../ShortedProduct';

export default function FeaturedShortedProductBlock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchProducts({ limit: 3 });
      setProducts(products);
    }

    fetchData();
  }, []);

  return (
    <VStack
      p={8}
      spacing={8}
      borderWidth={1}
      align="flex-start"
      borderRadius="md"
    >
      {products.map(product => (
        <ShortedProduct key={product.id} {...product} />
      ))}
    </VStack>
  );
}
