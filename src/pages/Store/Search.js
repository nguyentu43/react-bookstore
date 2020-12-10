import {
  Button,
  GridItem,
  HStack,
  Select,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchProducts } from '../../api';
import FilterBlock from '../../components/Store/Block/FilterBlock';
import BlockLayout from '../../components/Store/BlockLayout';
import Product from '../../components/Store/Product';

export default function Search() {
  const { location } = useHistory();
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  async function fetchData(init = false) {
    const data = await fetchProducts({
      search: location.search && location.search.substr(1),
      offset: products.length,
      limit,
    });
    if (init) {
      setProducts(data.products);
    } else {
      setProducts(products.concat(data.products));
    }
    setHasMore(data.products.length < limit);
  }

  useEffect(() => {
    fetchData(true);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BlockLayout>
      <SimpleGrid columns={[1, 1, 1, 4]} gap={8}>
        <GridItem>
          <FilterBlock />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 3]}>
          <HStack mb={6} w={200}>
            <Select>
              <option value="short">Default sort</option>
            </Select>
          </HStack>
          <SimpleGrid
            borderTopWidth={1}
            borderLeftWidth={1}
            columns={[1, 2, 3, 4]}
          >
            {products.map(item => (
              <Product key={item.id} {...item} />
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
