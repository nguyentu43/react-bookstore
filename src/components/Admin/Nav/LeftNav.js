import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  FcBusinesswoman,
  FcFolder,
  FcList,
  FcManager,
  FcNews,
  FcPlus,
  FcRatings,
  FcReading,
} from 'react-icons/fc';

export default function LeftNav() {
  const menu = [
    { name: 'Book', icon: FcReading },
    { name: 'Category', icon: FcFolder },
    { name: 'Author', icon: FcBusinesswoman },
    { name: 'Order', icon: FcNews },
    { name: 'User', icon: FcManager },
  ];

  const action = [
    { name: 'List', icon: FcList },
    { name: 'Create', icon: FcPlus },
  ];

  return (
    <VStack
      borderRightWidth={[0, 0, 1]}
      py={4}
      align="stretch"
      h={["auto", "auto", "100vh"]}
    >
      <HStack px={4} pb={2}>
        <Avatar
          mr={4}
          size="lg"
          src="https://i.pinimg.com/originals/f5/1d/08/f51d08be05919290355ac004cdd5c2d6.png"
        />
        <Text fontSize="lg" fontWeight="bold">
          Pikachu
        </Text>
      </HStack>
      <Box borderTopWidth={1}>
        <HStack
          px={4}
          py={2}
          align="center"
          _hover={{ bg: 'gray.50', cursor: 'pointer' }}
        >
          <Icon w={8} h={8} as={FcRatings} />
          <Text>Dashboard</Text>
        </HStack>
        <Accordion allowToggle allowMultiple>
          {menu.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <HStack flex="1" align="center">
                  <Icon w={8} h={8} as={item.icon} />
                  <Text>{item.name}</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {action.map((item, index) => (
                  <HStack py={2} key={index} align="center">
                    <Icon w={8} h={8} as={item.icon} />
                    <Text>{item.name}</Text>
                  </HStack>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </VStack>
  );
}
