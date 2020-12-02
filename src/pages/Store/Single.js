import Breadcrumb from '../../components/Store/Nav/Breadcrumb';
import BlockLayout from '../../components/Store/BlockLayout';
import {
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
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
import Book from '../../imgs/single.jpg';
import CurrencyFormat from 'react-currency-format';
import AddProductForm from '../../components/Store/Form/AddProductForm';
import { FaHeart, FaShare } from 'react-icons/fa';
import CarouselWrapper from '../../components/Store/Wrapper/CarouselWrapper';
import FeaturedShortedProductBlock from '../../components/Store/Block/FeaturedShortedProductBlock';
import SupportInfoBlock from '../../components/Store/Block/SupportInfoBlock';
import Author from '../../components/Store/Author';

export default function Single() {
  return (
    <>
      <Breadcrumb />
      <BlockLayout>
        <SimpleGrid columns={[1, 1, 1, 3]} gap={20}>
          <GridItem colSpan={[1, 1, 1, 2]} justifyContent="stretch">
            <SimpleGrid columns={[1, 1, 1, 2]} gap={8} mb={12}>
              <Stack width={[200, 250, 350]} justifySelf="center">
                <CarouselWrapper responsive={null}>
                  <Image src={Book} objectFit="contain" />
                  <Image src={Book} objectFit="contain" />
                </CarouselWrapper>
              </Stack>
              <VStack spacing={4} align="stretch" textAlign="left">
                <Heading>All You Can Ever Know: A Memoir</Heading>
                <Text>By (author) Anna Banks</Text>
                <Text fontSize="2xl">
                  <CurrencyFormat
                    value={29.95}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  {'-'}
                  <CurrencyFormat
                    value={59.95}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Excepteur
                  sint occaecat.
                </Text>

                <AddProductForm />

                <HStack spacing={8} mt={8}>
                  <Text>
                    <Icon mr={2} w={6} h={6} as={FaHeart} />
                    Add to wishlist
                  </Text>
                  <Text>
                    <Icon mr={2} w={6} h={6} as={FaShare} />
                    Share
                  </Text>
                </HStack>
              </VStack>
            </SimpleGrid>

            <Box borderTopWidth={1} pt={8}>
              <Tabs isFitted variant="enclosed">
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Product Details</Tab>
                  <Tab>Reviews</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
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
      <BlockLayout blockName="Related Products"></BlockLayout>
    </>
  );
}
