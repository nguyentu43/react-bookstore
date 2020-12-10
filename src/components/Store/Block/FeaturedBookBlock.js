import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import Product from '../Product';

export default function FeaturedBookBlock({ featuredBooks, saleBooks, newestBooks }) {
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
              {featuredBooks.map(item => (
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
              {saleBooks.map(item => (
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
              {newestBooks.map(item => (
                <Product key={item.id} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BlockLayout>
  );
}
