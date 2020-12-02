import { Button, GridItem, HStack, Select, SimpleGrid } from '@chakra-ui/react';
import FilterBlock from '../../components/Store/Block/FilterBlock';
import BlockLayout from '../../components/Store/BlockLayout';
import Product from '../../components/Store/Product';

export default function Search() {
  return (
    <BlockLayout>
      <SimpleGrid columns={[1,1, 1, 3]} gap={8}>
        <GridItem>
            <FilterBlock />
        </GridItem>
        <GridItem colSpan={[1,1,1,2]}>
          <HStack mx={2} mb={6} w={200}>
              <Select>
                  <option value="short">Default sort</option>
              </Select>
          </HStack>
          <SimpleGrid columns={[1, 2, 3, 4]}>
            {[0, 0, 0, 0, 0, 0, 0, 0].map((items, index) => (
              <Product index={index} key={index} />
            ))}
          </SimpleGrid>
          <HStack mt={6} justify="center">
              <Button>1</Button>
              <Button>1</Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
