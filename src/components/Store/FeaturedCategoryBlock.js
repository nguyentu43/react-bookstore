import BlockLayout from './BlockLayout';
import * as FCIcons from 'react-icons/fc';
import { VStack, Heading, Icon, Stack, Box, Text, SimpleGrid } from '@chakra-ui/react';

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
      <Stack direction={["column", "column", "row"]} justify="space-between">
        {data.map((item, index) => (
          <VStack align="flex-start" key={index} bg="pink.50" px={8} py={6}>
            <Icon w={12} h={12} as={FCIcons[item.icon || 'FcReading']} />
            <Text width={150} isTruncated fontSize="2xl">{item.name}</Text>
            <Heading fontWeight="none" size="md">Shop Now</Heading>
          </VStack>
        ))}
      </Stack>
    </BlockLayout>
  );
}
