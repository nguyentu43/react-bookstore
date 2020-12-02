import { GridItem, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import ShortedCartBlock from "../../components/Store/Block/ShortedCartBlock";
import BlockLayout from "../../components/Store/BlockLayout";
import CheckoutForm from "../../components/Store/Form/CheckoutForm";
import PromoCodeForm from "../../components/Store/Form/PromoCodeForm";

export default function Checkout(){
    return <BlockLayout blockName="Checkout">
        <SimpleGrid columns={[1,1,3]} gap={8}>
            <GridItem colSpan={[1,1,2]}>
                <Heading mb={4} size="lg">Billing Address</Heading>
                <CheckoutForm />
            </GridItem>
            <GridItem colSpan={1} order={[-1, -1, 2]}>
                <Heading mb={4} size="lg">Your Cart</Heading>
                <ShortedCartBlock/>
                <PromoCodeForm />
            </GridItem>
        </SimpleGrid>
    </BlockLayout>;
}