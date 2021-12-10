import { Avatar, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';

import {
  FcBusinesswoman,
  FcFolder,
  FcManager,
  FcNews,
  FcRatings,
  FcReading,
} from 'react-icons/fc';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const menu = [
  { name: 'Dashboard', icon: FcRatings, path: 'dashboard' },
  { name: 'Order', icon: FcNews, path: 'order' },
  { name: 'Gallery', icon: FcFolder, path: 'gallery' },
  { name: 'Category', icon: FcFolder, path: 'category' },
  { name: 'Author', icon: FcBusinesswoman, path: 'author' },
  { name: 'Book', icon: FcReading, path: 'book' },
  { name: 'User', icon: FcManager, path: 'user' },
];

export default function LeftNav({ onClose }) {
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  return (
    <VStack
      borderRightWidth={[0, 0, 1]}
      py={4}
      align="stretch"
      h="100vh"
      overflow="auto"
    >
      <HStack px={4} pb={2}>
        <Avatar mr={4} size="lg" />
        <Text fontSize="lg" fontWeight="bold">
          { auth.name }
        </Text>
      </HStack>
      <Box borderTopWidth={1}>
        {menu.map(item => (
          <HStack
            key={item.path}
            px={4}
            py={2}
            align="center"
            borderBottomWidth={1}
            onClick={() => {
              if (onClose) onClose();
              history.push('/admin/' + item.path);
            }}
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
          >
            <Icon w={8} h={8} as={item.icon} />
            <Text>{item.name}</Text>
          </HStack>
        ))}
      </Box>
    </VStack>
  );
}
