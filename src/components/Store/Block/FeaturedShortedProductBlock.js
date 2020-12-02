import { VStack } from "@chakra-ui/react";
import ShortedProduct from "../ShortedProduct";

export default function FeaturedShortedProductBlock(){
    return <VStack p={8} spacing={8} borderWidth={1} align="flex-start" borderRadius="md">
        <ShortedProduct/>
        <ShortedProduct/>
        <ShortedProduct/>
    </VStack>
}