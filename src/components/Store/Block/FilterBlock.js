import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Radio,
  RadioGroup,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAuthors, fetchCategories } from '../../../api';
import FeaturedShortedProductBlock from './FeaturedShortedProductBlock';

export default function FilterBlock() {
  const { location, push } = useHistory();
  const [data, setData] = useState({ categories: [], authors: [] });
  const [category, setCategory] = useState(null);
  const [author, setAuthor] = useState(null);
  const [range, setRange] = useState([0, 500]);
  const [order, setOrder] = useState(0);
  const orderOptions = [
    {
      value: 0,
      name: 'Best Seller',
    },
    {
      value: 1,
      name: 'Newest',
    },
    {
      value: 2,
      name: 'Dec Price',
    },
    {
      value: 3,
      name: 'Inc Price',
    },
    {
      value: 4,
      name: 'On Sale',
    },
  ];

  function handleChangeLocation() {
    for (const sub of location.search.substr(1).split('&')) {
      const params = sub.split('=');
      if (params[0] === 'category') {
        setCategory(params[1]);
      } else if (params[0] === 'author') {
        setAuthor(params[1]);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { categories } = await fetchCategories();
      const { authors } = await fetchAuthors();
      setData({ categories, authors });
    }
    fetchData();
    handleChangeLocation();
  }, []);

  useEffect(() => {
    handleChangeLocation();
  }, [location]);

  useEffect(() => {
    let query = [];
    for (const sub of location.search.substr(1).split('&')) {
      const params = sub.split('=');
      if (['category', 'author', 'range', 'order'].indexOf(params[0]) === -1) {
        query.push(sub);
      }
    }
    if (category) {
      query.push('category=' + category);
    }
    if (author) {
      query.push('author=' + author);
    }
    query.push('range=' + range.join('-'));
    query.push('order=' + order);

    push('/store/search?' + query.join('&'));
  }, [category, author, range, order]);

  function handleChangeRange(v, type) {
    if (type === 'min') {
      if (v <= range[1] && v >= 0) {
        setRange([v, range[1]]);
      }
    } else if (type === 'max') {
      if (v >= range[0] && v <= 500) {
        setRange([range[0], v]);
      }
    }
  }

  return (
    <Box borderLeftWidth={1} borderRightWidth={1} borderRadius="md">
      <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Order by</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Select
              value={order}
              onChange={e => {
                setOrder(e.target.value);
              }}
            >
              {orderOptions.map(op => (
                <option value={op.value} key={op.value}>
                  {op.name}
                </option>
              ))}
            </Select>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Categories </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Button size="sm" onClick={() => setCategory(null)}>
              Clear
            </Button>
            <RadioGroup
              onChange={v => {
                setCategory(v);
              }}
            >
              <VStack align="stretch">
                {data.categories.map(c => (
                  <Radio value={c.id} key={c.id} isChecked={c.id === category}>
                    {(c.parent ? c.parent.name + '/' : '') + c.name}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Author </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Button size="sm" onClick={() => setAuthor(null)}>
              Clear
            </Button>
            <RadioGroup onChange={v => setAuthor(v)}>
              <VStack align="stretch">
                {data.authors.map(item => (
                  <Radio
                    isChecked={item.id === author}
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Filter by price</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Min:{' '}
            <NumberInput
              value={range[0]}
              onChange={v => handleChangeRange(v, 'min')}
              min={0}
              max={500}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            Max:{' '}
            <NumberInput
              value={range[1]}
              onChange={v => handleChangeRange(v, 'max')}
              min={0}
              max={500}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Featured Books</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FeaturedShortedProductBlock />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
