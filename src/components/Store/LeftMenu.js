import { VStack, Text, Icon, Flex, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const stack = [];
const prevItemStack = [];

export default function LeftMenu({categories}) {

  const [items, setItems] = useState([...categories]);
  const [prevItem, setPrevItem] = useState(null);
  const {push} = useHistory();

  function handleClick(item) {

    if(item.children && item.children.length > 0){
      stack.push(items);
      prevItemStack.push(item);
      setItems(item.children);
      setPrevItem(item);
    }
    else{
      push('/store/search?category=' + item.id);
    }
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
      {
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
              {item.children && item.children.length >0 && <Icon as={FaChevronRight} />}
            </Flex>
          );
        })}
        {items.length > 0 && <Flex
              onClick={() => handleClick({ id: prevItem.id})}
              _hover={{ cursor: 'pointer' }}
              align="center"
              justify="space-between"
            >
              <Text>Rest</Text>
            </Flex>}
    </VStack>
  );
}
