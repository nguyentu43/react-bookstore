/* eslint-disable react-hooks/exhaustive-deps */
import Breadcrumb from '../../components/Store/Nav/Breadcrumb';
import BlockLayout from '../../components/Store/BlockLayout';
import {
  Box,
  GridItem,
  Heading,
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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FcContacts, FcBookmark } from 'react-icons/fc';
import CurrencyFormat from 'react-currency-format';
import AddProductForm from '../../components/Store/Form/AddProductForm';
import CarouselWrapper from '../../components/Store/Wrapper/CarouselWrapper';
import FeaturedShortedProductBlock from '../../components/Store/Block/FeaturedShortedProductBlock';
import SupportInfoBlock from '../../components/Store/Block/SupportInfoBlock';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProducts } from '../../api';
import { useEffect, useMemo, useState } from 'react';
import Product from '../../components/Store/Product';
import LoadingData from '../../components/LoadingData';
import CommentForm from '../../components/Store/Form/CommentForm';
import Comment from '../../components/Store/Comment';
import Rating from '../../components/Store/Rating';
import { useAppContext } from '../../context';

export default function Single() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setProducts] = useState([]);
  const toast = useToast();

  const {
    state: { auth },
  } = useAppContext();

  async function reloadRatings() {
    const {
      product: { ratings },
    } = await fetchProduct({ slug });
    setProduct({ ...product, ratings });
  }

  const rateValue = useMemo(
    () =>
      product !== null
        ? product.ratings.reduce((prev, { rate }) => prev + rate, 0) /
          product.ratings.length
        : 0,
    [product]
  );

  const hasRate = useMemo(() => {
    if (!auth.isLogin) return false;
    return (
      product && product.ratings.some(rating => rating.user.id === auth.id)
    );
  }, [product, auth]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { product } = await fetchProduct({ slug });
        const { products: related_products } = await fetchProducts({
          search: 'category=' + product.category.id,
          limit: 10,
        });
        setProduct(product);
        setProducts(related_products);
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    }

    fetchData();
  }, [slug]);

  if (!product) {
    return <LoadingData />;
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
                  {product.images.map((image, index) => (
                    <Image
                      loading="lazy"
                      key={index}
                      src={image.secure_url}
                      objectFit="contain"
                    />
                  ))}
                </CarouselWrapper>
              </Stack>
              <VStack spacing={2} align="flex-start">
                <Heading>{product.name}</Heading>
                <Text>
                  By (author) {product.authors.map(a => a.name).join(', ')}
                </Text>
                {product.ratings.length > 0 && (
                  <Rating size={8} readonly={true} value={rateValue} />
                )}
                <Text fontSize="3xl">
                  <CurrencyFormat
                    value={product.price * (1 - product.discount)}
                    displayType={'text'}
                    decimalScale={2}
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
                          decimalScale={2}
                          thousandSeparator={true}
                          prefix={'$'}
                        />
                      </Text>
                    </>
                  )}
                </Text>
                <Text
                  noOfLines={4}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></Text>
                <AddProductForm id={product.id} />
              </VStack>
            </SimpleGrid>

            <Box borderTopWidth={1} pt={8}>
              <Tabs isFitted variant="enclosed">
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Product Details</Tab>
                  <Tab>Ratings</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></TabPanel>
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
                  <TabPanel>
                    {!auth.isLogin ? (
                      <VStack
                        align="flex-start"
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        mb={4}
                      >
                        <Heading size="md">
                          Login to leave some feedback
                        </Heading>
                      </VStack>
                    ) : (
                      !hasRate && (
                        <CommentForm
                          onPost={reloadRatings}
                          productID={product.id}
                        />
                      )
                    )}
                    {product.ratings.map(rating => (
                      <Comment
                        data={rating}
                        key={rating.id}
                        productID={product.id}
                        onRemove={reloadRatings}
                        onPost={reloadRatings}
                      />
                    ))}
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
        <CarouselWrapper
          slidesToShow={relatedProducts.length < 5 ? relatedProducts.length : 5}
          infinite={false}
          dots={false}
          arrows={true}
        >
          {relatedProducts.map(item => (
            <Product inSlider={true} {...item} key={item.id} />
          ))}
        </CarouselWrapper>
      </BlockLayout>
    </>
  );
}
