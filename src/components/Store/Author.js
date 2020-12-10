import { VStack, Avatar, Text, Box } from '@chakra-ui/react';

export default function Author({ name, avatar, books }) {
  return (
    <VStack>
      <Avatar size="2xl" src={avatar} />
      <Box textAlign="center">
        <Text fontWeight="bold">{name}</Text>
        <Text>{books} Published Books</Text>
      </Box>
    </VStack>
  );
}
