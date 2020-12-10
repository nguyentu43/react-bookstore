import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaAlignJustify, FaSearch } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import LeftDrawer from '../Drawer/LeftDrawer';

export default function BottomNav({ categories }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();
  const history = useHistory();
  const [keyword, setKeyword] = useState('');

  function handleSeach(e) {
    if (e.key === 'Enter' && keyword.trim().length > 3) {
      history.push('/store/search?keyword=' + keyword.trim());
    }
  }

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      px={[4, 6, 12]}
      py={6}
      borderBottomWidth={1}
      justify="space-between"
      align={['stretch', 'stretch', 'center']}
    >
      <HStack spacing={[4, 8]}>
        <IconButton
          onClick={onOpen}
          size="md"
          icon={<Icon as={FaAlignJustify} />}
        />
        <Heading as={Link} to="/store">
          Bookworm
        </Heading>
      </HStack>

      <HStack d={['none', 'none', 'none', 'flex']}>
        <Text>Home</Text>
        <Text onClick={onOpen}>Categories</Text>
        <Text>About us</Text>
      </HStack>

      <Box w={['auto', 'auto', 300]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} />}
          />
          <Input
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value);
            }}
            onKeyPress={handleSeach}
            placeholder="Search by keyword"
          />
        </InputGroup>
      </Box>

      <LeftDrawer
        categories={categories}
        ref={btnRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Stack>
  );
}
