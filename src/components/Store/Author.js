import { VStack, Avatar, Text, Box } from '@chakra-ui/react';
import AuthorImg from '../../imgs/author.jpg';

export default function Author() {
  return (
    <VStack>
      <Avatar size="2xl" src={AuthorImg} />
      <Box textAlign="center">
        <Text fontWeight="bold">A G Riddle</Text>
        <Text>2 Published Books</Text>
      </Box>
    </VStack>
  );
}
