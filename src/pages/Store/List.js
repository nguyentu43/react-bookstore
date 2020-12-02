import { Button, HStack, SimpleGrid } from '@chakra-ui/react';
import BlockLayout from '../../components/Store/BlockLayout';
import Product from '../../components/Store/Product';

export default function List() {
  return (
    <BlockLayout>
      <SimpleGrid columns={[1, 2, 4, 5]}>
        {[0, 0, 0, 0, 0, 0, 0, 0].map((items, index) => (
          <Product index={index} key={index} />
        ))}
      </SimpleGrid>
      <HStack mt={6} justify="center">
        <Button>1</Button>
        <Button>1</Button>
      </HStack>
    </BlockLayout>
  );
}
