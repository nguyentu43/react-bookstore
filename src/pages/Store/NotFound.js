import { Button, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <VStack justify="center" css={{ minHeight: '100vh' }}>
      <Heading as="h1" size="4xl">
        404
      </Heading>
      <Heading as="h3" size="2xl">
        Page not found
      </Heading>
      <Button colorScheme="teal" variant="solid" as={Link} to="/store">
        Go back to store
      </Button>
    </VStack>
  );
}
