import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api';
import BlockLayout from '../BlockLayout';
import Product from '../Product';

export default function FeaturedBookBlock() {
  const [data, setData] = useState({
    featuredBooks: [],
    saleBooks: [],
    newestBooks: [],
  });

  useEffect(() => {
    async function fetchData() {
      const { products: saleBooks } = await fetchProducts({
        search: 'order=4',
        limit: 10,
      });

      const { products: newestBooks } = await fetchProducts({
        search: 'order=1',
        limit: 10,
      });

      const { products: featuredBooks } = await fetchProducts({
        search: 'order=0',
        limit: 10,
      });

      setData({ saleBooks, newestBooks, featuredBooks });
    }
    fetchData();
  }, []);

  return (
    <BlockLayout blockName="Featured Books">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Featured</Tab>
          <Tab>On Sale</Tab>
          <Tab>Newest</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid
              borderTopWidth={1}
              borderLeftWidth={1}
              columns={[1, 2, 3, 5]}
            >
              {data.featuredBooks.map(item => (
                <Product key={item.id} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid
              borderTopWidth={1}
              borderLeftWidth={1}
              columns={[1, 2, 3, 5]}
            >
              {data.saleBooks.map(item => (
                <Product key={item.id} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid
              borderTopWidth={1}
              borderLeftWidth={1}
              columns={[1, 2, 3, 5]}
            >
              {data.newestBooks.map(item => (
                <Product key={item.id} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BlockLayout>
  );
}
