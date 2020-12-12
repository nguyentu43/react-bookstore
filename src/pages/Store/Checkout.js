import { GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import ShortedOrderBlock from '../../components/Store/Block/ShortedOrderBlock';
import BlockLayout from '../../components/Store/BlockLayout';
import CheckoutForm from '../../components/Store/Form/CheckoutForm';
import { useAppContext } from '../../context';

export default function Checkout() {
  const {
    state: { cart },
  } = useAppContext();

  return (
    <BlockLayout blockName="Checkout">
      <SimpleGrid columns={[1, 1, 3]} gap={8}>
        <GridItem colSpan={[1, 1, 2]}>
          <Heading mb={4} size="lg">
            Billing Address
          </Heading>
          <CheckoutForm />
        </GridItem>
        <GridItem colSpan={1} order={[-1, -1, 2]}>
          <Heading mb={4} size="lg">
            Your Cart
          </Heading>
          <ShortedOrderBlock {...cart} />
        </GridItem>
      </SimpleGrid>
    </BlockLayout>
  );
}
