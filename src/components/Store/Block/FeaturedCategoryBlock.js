import BlockLayout from '../BlockLayout';
import * as FCIcons from 'react-icons/fc';
import { VStack, Heading, Icon, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function FeaturedCategoryBlock({ categories }) {

  return (
    <BlockLayout
      blockName="Featured Categories"
      rightButtonName="All Categories"
      to="/store/search"
    >
      <SimpleGrid columns={[1, 2, 3, 4]} gap={2}>
        {categories.map(item => (
          <VStack
            align="flex-start"
            borderRadius="md"
            key={item.id}
            bg="pink.50"
            px={8}
            py={6}
          >
            <Icon w={12} h={12} as={FCIcons[item.icon || 'FcReading']} />
            <Text noOfLines={1} fontSize="2xl">
              {item.name}
            </Text>
            <Text
              _hover={{ cursor: 'pointer' }}
              to={'/store/search?category=' + item.id}
              as={Link}
              size="lg"
            >
              Shop Now
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </BlockLayout>
  );
}
