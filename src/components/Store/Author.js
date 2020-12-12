import { VStack, Avatar, Text, Box } from '@chakra-ui/react';
import {  Link } from 'react-router-dom';

export default function Author({ id, name, avatar, books }) {

  return (
    <VStack
      as={Link}
      to = {'/store/search?author=' + id}
    >
      <Avatar size="2xl" src={avatar} />
      <Box textAlign="center">
        <Text fontWeight="bold">{name}</Text>
        <Text>{books} Published Books</Text>
      </Box>
    </VStack>
  );
}
