import { VStack } from "@chakra-ui/react";
import ShortedProduct from "../ShortedProduct";

export default function ShortedProductBlock(){
    return <VStack p={8} spacing={8} borderWidth={1} align="flex-start">
        <ShortedProduct/>
        <ShortedProduct/>
        <ShortedProduct/>
    </VStack>
}