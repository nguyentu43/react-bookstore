import Breadcrumb from '../../components/Store/Nav/Breadcrumb';
import BlockLayout from '../../components/Store/BlockLayout';
import {
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FcContacts, FcBookmark } from 'react-icons/fc';
import CurrencyFormat from 'react-currency-format';
import AddProductForm from '../../components/Store/Form/AddProductForm';
import { FaHeart, FaShare } from 'react-icons/fa';
import CarouselWrapper from '../../components/Store/Wrapper/CarouselWrapper';
import FeaturedShortedProductBlock from '../../components/Store/Block/FeaturedShortedProductBlock';
import SupportInfoBlock from '../../components/Store/Block/SupportInfoBlock';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProduct, fetchProducts } from '../../api';
import { useEffect, useState } from 'react';
import Product from '../../components/Store/Product';

export default function Single() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const [relatedProducts, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { product } = await fetchProduct({ slug });
        const { products } = await fetchProducts({
          search: 'category=' + product.category.id,
          limit: 10,
        });
        setProduct(product);
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (!product) {
    return 'loading......';
  }

  return (
    <>
      <Breadcrumb category={product.category} />
      <BlockLayout>
        <SimpleGrid columns={[1, 1, 1, 3]} gap={20}>
          <GridItem colSpan={[1, 1, 1, 2]} justifyContent="stretch">
            <SimpleGrid columns={[1, 1, 1, 2]} gap={8} mb={12}>
              <Stack width={[200, 250, 350]} justifySelf="center">
                <CarouselWrapper responsive={null}>
                  {product.images.map(image => (
                    <Image src={image.secure_url} objectFit="contain" />
                  ))}
                </CarouselWrapper>
              </Stack>
              <VStack spacing={4} align="stretch" textAlign="left">
                <Heading>{product.name}</Heading>
                <Text>
                  By (author) {product.authors.map(a => a.name).join(', ')}
                </Text>
                <Text fontSize="3xl">
                  <CurrencyFormat
                    value={product.price * (1 - product.discount)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  {product.discount > 0 && (
                    <>
                      <br />
                      <Text as="s" fontSize="xl">
                        <CurrencyFormat
                          value={product.price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                        />
                      </Text>
                    </>
                  )}
                </Text>
                <Text noOfLines={4}>{product.description}</Text>

                <AddProductForm id={product.id} />
              </VStack>
            </SimpleGrid>

            <Box borderTopWidth={1} pt={8}>
              <Tabs isFitted variant="enclosed">
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Product Details</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>{product.description}</TabPanel>
                  <TabPanel>
                    <List>
                      <ListItem>
                        <ListIcon w={10} h={10} as={FcBookmark} />
                        Category: {product.category.name}
                      </ListItem>
                      <ListItem>
                        <ListIcon w={10} h={10} as={FcContacts} />
                        Author: {product.authors.map(a => a.name).join(', ')}
                      </ListItem>
                    </List>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <FeaturedShortedProductBlock />
            <Box mt={8}>
              <SupportInfoBlock />
            </Box>
          </GridItem>
        </SimpleGrid>
      </BlockLayout>
      <BlockLayout blockName="Related Products">
        <CarouselWrapper slidesToShow={5} dots={false} arrows={true}>
          {relatedProducts.map(item => (
            <Product inSlider={true} {...item} key={item.id} />
          ))}
        </CarouselWrapper>
      </BlockLayout>
    </>
  );
}
