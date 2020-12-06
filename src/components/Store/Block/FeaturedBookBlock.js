import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import Product from '../Product';

export default function FeaturedBookBlock() {
  return (
    <BlockLayout blockName="Featured Books">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Featured</Tab>
          <Tab>On Sale</Tab>
          <Tab>Most Viewed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid borderTopWidth={1} borderLeftWidth={1} columns={[1, 2, 3, 5]}>
             { [0,0,0,0,0,0, 0, 0, 0].map((items, index) => (<Product key={index} />))  }      
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BlockLayout>
  );
}
