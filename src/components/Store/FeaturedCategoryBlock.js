import BlockLayout from './BlockLayout';
import * as FCIcons from 'react-icons/fc';
import { VStack, Heading, Icon, Text, SimpleGrid } from '@chakra-ui/react';

export default function FeaturedCategoryBlock() {
  const data = [
    { name: 'Arts & Photography', icon: 'FcStackOfPhotos' },
    { name: 'Food & Drink' },
    { name: 'Romance' },
    { name: 'Health' },
    { name: 'Biography' },
  ];

  return (
    <BlockLayout
      blockName="Featured Categories"
      rightButtonName="All Categories"
    >
      <SimpleGrid columns={[1, 2, 3, 4]} gap={2}>
        {data.map((item, index) => (
          <VStack align="flex-start" key={index} bg="pink.50" px={8} py={6}>
            <Icon w={12} h={12} as={FCIcons[item.icon || 'FcReading']} />
            <Text width={150} isTruncated fontSize="2xl">{item.name}</Text>
            <Heading fontWeight="none" size="md">Shop Now</Heading>
          </VStack>
        ))}
      </SimpleGrid>
    </BlockLayout>
  );
}
