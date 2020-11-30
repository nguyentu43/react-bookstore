import { VStack, Text, Icon, Flex, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const stack = [];
const prevItemStack = [];

export default function LeftMenu() {
  const data = [
    {
      id: 1,
      name: 'History',
      childrens: [
        { id: 3, name: 'Vietnam' },
        { id: 4, name: 'US' },
      ],
    },
    {
      id: 2,
      name: 'Lan 1',
      childrens: [
        { id: 5, name: 'Vietnam' },
        {
          id: 6,
          name: 'Lan 2',
          childrens: [
            { id: 7, name: 'Vietnam 3' },
            { id: 8, name: 'Lan 3', childrens: [
                { id: 9, name: 'Vietnam 3' },
                { id: 10, name: 'Lan 4' },
              ], },
          ],
        },
      ],
    },
  ];

  const [items, setItems] = useState([...data]);
  const [prevItem, setPrevItem] = useState(null);

  function handleClick(item) {
    stack.push(items);
    prevItemStack.push(item);
    setItems(item.childrens);
    setPrevItem(item);
  }

  function handlePrevClick() {
    setItems(stack.pop());

    if(prevItemStack.length === 1){
        prevItemStack.pop();
        setPrevItem(null);
        return;
    }
    prevItemStack.pop();
    setPrevItem(prevItemStack[prevItemStack.length - 1]);
  }

  return (
    <VStack align="stretch" spacing={3}>
      {prevItem && (
        <Flex
          onClick={handlePrevClick}
          _hover={{ cursor: 'pointer' }}
          align="center"
        >
          <Icon mr={2} as={FaChevronLeft} />
          <Text>{prevItem.name}</Text>
        </Flex>
      )}
      {items &&
        items.map(item => {
          return (
            <Flex
              onClick={() => handleClick(item)}
              _hover={{ cursor: 'pointer' }}
              key={item.id}
              align="center"
              justify="space-between"
            >
              <Text>{item.name}</Text>
              {item.childrens && <Icon as={FaChevronRight} />}
            </Flex>
          );
        })}
    </VStack>
  );
}
