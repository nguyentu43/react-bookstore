/* eslint-disable react-hooks/exhaustive-deps */
import { GridItem, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchProducts } from '../../api';
import FilterBlock from '../../components/Store/Block/FilterBlock';
import BlockLayout from '../../components/Store/BlockLayout';
import Product from '../../components/Store/Product';
import InifiniteScroll from 'react-infinite-scroll-component';
import InfoEmptyList from '../../components/InfoEmptyList';

export default function Search() {
  const { location } = useHistory();
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  async function fetchData(init = false) {
    const data = await fetchProducts({
      search: location.search && decodeURIComponent(location.search.substr(1)),
      offset: init ? 0 : products.length,
      limit,
    });
    if (init) {
      setProducts(data.products);
      console.log(data.products);
    } else {
      setProducts(products.concat(data.products));
    }
    setHasMore(data.products.length === limit);
  }

  useEffect(() => {
    fetchData(true);
  }, [location]);

  return (
    <BlockLayout>
      <SimpleGrid columns={[1, 1, 1, 4]} gap={8}>
        <GridItem>
          <FilterBlock />
        </GridItem>
        <GridItem colSpan={[1, 1, 1, 3]}>
          <SimpleGrid
            borderTopWidth={1}
            borderLeftWidth={1}
            as={InifiniteScroll}
            next={() => fetchData()}
            dataLength={products.length}
            hasMore={hasMore}
            loader={
              <>
                {Array.from({ length: limit }).map((_, i) => (
                  <Stack
                    key={i}
                    p={2}
                    borderRightWidth={1}
                    borderBottomWidth={1}
                  >
                    <Skeleton height="240px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                  </Stack>
                ))}
              </>
            }
            columns={[1, 2, 3, 4]}
          >
            {products.map(item => (
              <Product key={item.id} {...item} />
            ))}  
          </SimpleGrid>
          {products.length === 0 && <InfoEmptyList/>}
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
