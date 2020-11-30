import {
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';
import BlockLayout from './BlockLayout';
import Product from './Product';
import Book from '../../imgs/book-sales.png';

export default function NewReleaseBlock() {
  return (
    <BlockLayout blockName="New Releases">
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]}>
        <GridItem colSpan={1} bg="pink.50" mb={4}>
          <VStack align="stretch" px={8} justify="center" my={16}>
            <Image src={Book} />
            <VStack align="flex-start">
              <Text fontSize="4xl">Get Extra</Text>
              <Text fontSize="5xl" textColor="red.500">
                Sale -25%
              </Text>
              <Text fontSize="xl" fontWeight="bold" textColor="gray.500">
                ON ORDER OVER <br />
                $100
              </Text>
              <Button colorScheme="pink">View More</Button>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={[1, 1, 2]} px={4}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Featured</Tab>
              <Tab>On Sale</Tab>
              <Tab>Most Viewed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2, 2, 3]}>
                  {[0, 0, 0, 0, 0, 0, 0, 0].map((items, index) => (
                    <Product index={index} key={index} />
                  ))}
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
        </GridItem>
      </Grid>
    </BlockLayout>
  );
}
