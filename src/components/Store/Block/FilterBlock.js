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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAuthors, fetchCategories } from '../../../api';
import FeaturedShortedProductBlock from './FeaturedShortedProductBlock';

export default function FilterBlock() {
  const { location, push } = useHistory();
  const [data, setData] = useState({ categories: [], authors: [] });
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  const [priceRange, setRange] = useState({ start: 0, end: 10 });

  useEffect(() => {
    async function fetchData() {
      const { categories } = await fetchCategories();
      const { authors } = await fetchAuthors();
      setData({ categories, authors });
    }
    fetchData();
  }, []);

  useEffect(() => {
    for (const sub of location.search.substr(1).split('&')) {
      const params = sub.split('=');
      if (params[0] === 'category') {
        setCategory(params[1]);
      } else if (params[0] === 'author') {
        setAuthor(params[1]);
      }
    }
  }, [location]);

  useEffect(() => {
    let query = [];
    for (const sub of location.search.substr(1).split('&')) {
      const params = sub.split('=');
      if (['category', 'author'].indexOf(params[0]) === -1) {
        query.push(sub);
      }
    }
    if (category) {
      query.push('category=' + category);
    }
    if (author) {
      query.push('author=' + author);
    }
    push('/store/search?' + query.join('&'));
  }, [category, author]);

  return (
    <Box borderLeftWidth={1} borderRightWidth={1} borderRadius="md">
      <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" py={4} textAlign="left">
              <Heading size="md">Categories</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
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
              <Heading size="md">Author</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <RadioGroup onChange={v => setAuthor(v)}>
              <VStack align="stretch">
                {data.authors.map(author => (
                  <Radio isChecked={author.id === author} key={author.id} value={author.id}>
                    {author.name}
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
          <AccordionPanel pb={4}></AccordionPanel>
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
