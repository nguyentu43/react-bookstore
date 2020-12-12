import { Flex, Spinner } from '@chakra-ui/react';

export default function LoadingData() {
  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justify="center"
      bg="white"
      zIndex="banner"
    >
      <Spinner size="xl" color="blue.500" />
    </Flex>
  );
}
