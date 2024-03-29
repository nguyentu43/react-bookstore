/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
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
  VStack,
  Spinner,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaAlignJustify, FaBackspace, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { fetchProducts } from '../../../api';
import LeftDrawer from '../Drawer/LeftDrawer';
import _ from 'lodash';
import ShortedProduct from '../ShortedProduct';

export default function BottomNav({ categories }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const trimmedKeyword = useMemo(() => keyword.trim(), [keyword]);
  const [showList, setShowList] = useState(false);
  const toast = useToast();

  async function fetchData(keyword) {
    setShowList(true);
    setLoading(true);
    try {
      const { products } = await fetchProducts({
        search: 'keyword=' + keyword,
        limit: 3,
      });
      setBooks(products);
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    } finally {
      setLoading(false);
    }
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      history.push('/store/search?keyword=' + trimmedKeyword);
    }
  }

  const debounce = useCallback(_.debounce(fetchData, 300), []);

  function handleChangeKeyword(e) {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() !== '') {
      debounce(value.trim());
    }
  }

  useEffect(() => {
    for (const sub of history.location.search.substr(1).split('&')) {
      const params = sub.split('=');
      if (params[0] === 'keyword') {
        const decode = decodeURIComponent(params[1].trim());
        if (decode !== '') {
          setKeyword(decode);
          fetchData(decode);
        }
      }
    }
  }, []);

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      px={[4, 6, 12]}
      py={6}
      borderBottomWidth={1}
      justify="space-between"
      align={['stretch', 'stretch', 'center']}
    >
      <HStack spacing={[2, 4]}>
        <IconButton
          onClick={onOpen}
          size="md"
          colorScheme="blue"
          icon={<Icon as={FaAlignJustify} />}
        />
        <Heading as={Link} to="/store">
          Bookstore
        </Heading>
      </HStack>

      <Box w={['auto', 'auto', 300]} pos="relative">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} />}
          />
          <Input
            value={keyword}
            onChange={handleChangeKeyword}
            onKeyPress={handleEnter}
            placeholder="Typing your keyword..."
          />
          <InputRightElement
            children={
              <IconButton
                onClick={() => setKeyword('')}
                icon={<Icon as={FaBackspace} />}
              />
            }
          />
        </InputGroup>
        {showList && (
          <VStack
            right={0}
            left={0}
            align="stretch"
            bg="white"
            mt={4}
            borderWidth={1}
            borderRadius="md"
            p={3}
            pos="absolute"
            zIndex="banner"
          >
            {loading ? (
              <Spinner color="blue.500" alignSelf="center" />
            ) : books.length > 0 ? (
              <>
                {books.map(p => (
                  <ShortedProduct {...p} key={p.id} />
                ))}
                <Text
                  textAlign="center"
                  color="blue.500"
                  as={Link}
                  onClick={() => setKeyword('')}
                  to={'/store/search?keyword=' + trimmedKeyword}
                >
                  See more books
                </Text>
              </>
            ) : (
              <Text>Please change another keyword</Text>
            )}
            <IconButton
              icon={<Icon as={FaTimes} />}
              onClick={() => setShowList(false)}
            />
          </VStack>
        )}
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
