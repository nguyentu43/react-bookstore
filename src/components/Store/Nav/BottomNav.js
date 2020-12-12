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
  useDisclosure,
  Text,
  VStack, Button
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaAlignJustify, FaSearch } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import LeftDrawer from '../Drawer/LeftDrawer';

export default function BottomNav({ categories }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();
  const history = useHistory();
  const [keyword, setKeyword] = useState('');

  function handleSeach(e) {
    if (e.key === 'Enter') {
      history.push('/store/search?keyword=' + keyword.trim());
    }
  }

  useEffect(() => {
    for (const sub of history.location.search.substr(1).split('&')){
      const params = sub.split('=');
      if(params[0] === 'keyword'){
        setKeyword(params[1]);
      }
    }
  }, [])

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
        <Button colorScheme="green" as={Link} to="/store">Home</Button>
        <Button colorScheme="blue" onClick={onOpen} to="/store">Categories</Button>
        <Button as={Link} to="/store#">About us</Button>
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
