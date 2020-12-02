import { Box, Text, Heading, Stack, Icon } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

export default function BlockLayout({
  blockName,
  rightButtonName,
  handleClickRighButton,
  children,
}) {
  return (
    <Box px={[4, 6, 12]} py={[4, 8]}>
      { blockName &&<Stack
        direction={['column', 'column', 'row']}
        justify="space-between"
        mb={[4, 8]}
      >
        <Heading>{blockName}</Heading>
        {rightButtonName && (
          <Text d="flex" alignItems="center" _hover={{ cursor: 'pointer' }} onClick={handleClickRighButton}>
            {rightButtonName} <Icon ml={2} as={FaChevronRight} />
          </Text>
        )}
      </Stack>}
      {children}
    </Box>
  );
}
