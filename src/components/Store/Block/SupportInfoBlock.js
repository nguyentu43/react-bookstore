import {
  Box,
  HStack,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaFacebookMessenger, FaRegMoneyBillAlt, FaShippingFast } from 'react-icons/fa';

export default function SupportInfoBlock() {
  return (
    <VStack
      spacing={8}
      borderWidth={1}
      p={8}
      align="flex-start"
      borderRadius="md"
    >
      <HStack spacing={8}>
        <Icon w={16} h={16} color="red.500" as={FaShippingFast} />
        <Box>
          <Text fontWeight="bold">Free Delivery</Text>
          Orders over $100
        </Box>
      </HStack>

      <HStack spacing={8}>
        <Icon w={16} h={16} color="red.500" as={FaRegMoneyBillAlt} />
        <Box>
          <Text fontWeight="bold">Secure Payment</Text>100% Secure Payment
        </Box>
      </HStack>

      <HStack spacing={8}>
        <Icon w={16} h={16} color="red.500" as={FaCheckCircle} />
        <Box>
          <Text fontWeight="bold">Money Back Guarantee
</Text>Within 30 Days
         
        </Box>
      </HStack>

      <HStack spacing={8}>
        <Icon w={16} h={16} color="red.500" as={FaFacebookMessenger} />
        <Box>
          <Text fontWeight="bold">24/7 Support
</Text>Within 1 Business Day
        </Box>
      </HStack>
    </VStack>
  );
}
