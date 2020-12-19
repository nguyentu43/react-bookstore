import { Heading, VStack, Text, HStack, Input, Button } from '@chakra-ui/react';

export default function TopFooter() {
  return (
    <VStack borderTopWidth={1} py={16} px={[4, 6, 12]} spacing={4}>
      <Heading>Join Our Newsletter</Heading>
      <Text>
        Signup to be the first to hear about exclusive deals, special offers and
        upcoming collections
      </Text>

      <form>
        <HStack minWidth={['auto', 'auto', 500]}>
          <Input placeholder="Enter email for weekly newsletter." />
          <Button colorScheme="blue" type="submit">
            Subscribe
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
