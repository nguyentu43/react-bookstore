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
  Button, useColorModeValue
} from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import Product from '../Product';
import Book from '../../../imgs/books.png';

export default function NewReleaseBlock({ categories }) {

  const bg = useColorModeValue('pink.50', "pink.500");

  return (
    <BlockLayout blockName="New Releases">
      <SimpleGrid columns={[1, 1, 3]}>
        <GridItem colSpan={1} bg={bg} borderRadius="md">
          <VStack align="stretch" px={8} justify="center" my={16}>
            <Image objectFit="contain" src={Book} />
            <VStack align="flex-start">
              <Text fontSize="4xl">Get Extra</Text>
              <Text fontSize="5xl" textColor="red.500">
                Sale -25%
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                ON ORDER OVER <br />
                $100
              </Text>
              <Button colorScheme="blue">View More</Button>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={[1, 1, 2]} px={[0, 0, 4]}>
          <Tabs isFitted variant="enclosed">
            <TabList>
              {categories.map(category => (
                <Tab key={category.id}>{category.name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {categories.map(category => (
                <TabPanel key={category.id} px={0} pb={0}>
                  <SimpleGrid
                    borderTopWidth={1}
                    borderLeftWidth={1}
                    columns={[1, 2, 2, 3]}
                  >
                    {category.products.map((item) => (
                      <Product key={item.id} {...item} />
                    ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
