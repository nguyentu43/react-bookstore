import { Box, Heading, HStack } from '@chakra-ui/react';

export default function BlockLayout({ children, blockName }) {
  return (
    <Box borderWidth={1} borderRadius="md">
      {blockName && (
        <HStack py={2} borderBottomWidth={1} px={2}>
          <Heading size="md">{blockName}</Heading>
        </HStack>
      )}
      <Box p={2}>{children}</Box>
    </Box>
  );
}
