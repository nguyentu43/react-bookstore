import { Box, HStack, Icon, StackDivider, Text, VStack } from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { FaTimes } from 'react-icons/fa';

export default function ShortedCartBlock() {
  return (
    <VStack align="stretch" mb={4} borderWidth={1} p={4} borderRadius="md" divider={<StackDivider />}>
      <HStack justify="space-between">
        <Box>
          <Text fontWeight="bold">Product Name</Text>
          <Text as="small">x10</Text>
        </Box>

        <Text>
          <CurrencyFormat
            value={29.95}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </HStack>
      <HStack justify="space-between">
        <Box>
          <Text fontWeight="bold">Product Name</Text>
          <Text as="small">x10</Text>
        </Box>

        <Text>
          <CurrencyFormat
            value={29.95}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </HStack>
      <HStack justify="space-between">
        <Text fontWeight="bold">NEWCODE <br/><Text color="red.500" as="small">Remove this code</Text></Text>
        <Text fontWeight="bold">
          <CurrencyFormat
            value={-5}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Total</Text>
        <Text fontWeight="bold">
          <CurrencyFormat
            value={29.95}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Text>
      </HStack>
    </VStack>
  );
}
