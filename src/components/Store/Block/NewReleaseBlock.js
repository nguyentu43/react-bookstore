import {
  SimpleGrid,
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
  useColorModeValue,
} from '@chakra-ui/react';
import BlockLayout from '../BlockLayout';
import Product from '../Product';
import Book from '../../../imgs/books.png';
import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../../../api';
import InfoEmptyList from '../../InfoEmptyList';
import LoadingDataSkeleton from '../../LoadingDataSkeleton';

export default function NewReleaseBlock() {
  const bg = useColorModeValue('pink.50', 'pink.500');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { categories } = await fetchCategories();

      for (const category of categories) {
        category.products = (
          await fetchProducts({
            search: 'order=4&category=' + category.id,
            limit: 9,
          })
        ).products;
      }

      setCategories(categories);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout blockName="New Releases">
      <SimpleGrid columns={[1, 1, 3]} gap={4}>
        <GridItem colSpan={1} bg={bg} borderRadius="md">
          <VStack align="stretch" p={8} justify="center">
            <Image loading="lazy" objectFit="contain" src={Book} />
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
        <GridItem colSpan={[1, 1, 2]} px={[0, 0, 4]} overflow="overlay">
          <LoadingDataSkeleton loading={loading} line={10}>
            <Tabs isFitted variant="enclosed">
              <TabList overflowY="scroll">
                {categories.map(category => (
                  <Tab key={category.id}>{category.name}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {categories.map(category => (
                  <TabPanel key={category.id} px={0} pb={0}>
                    {category.products.length > 0 ? (
                      <SimpleGrid
                        borderTopWidth={1}
                        borderLeftWidth={1}
                        columns={[1, 2, 2, 3]}
                      >
                        {category.products.map(item => (
                          <Product key={item.id} {...item} />
                        ))}
                      </SimpleGrid>
                    ) : (
                      <InfoEmptyList />
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </LoadingDataSkeleton>
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
