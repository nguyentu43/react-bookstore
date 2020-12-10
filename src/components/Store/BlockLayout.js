import { Box, Text, Heading, Stack, Icon } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BlockLayout({
  blockName,
  rightButtonName,
  to = '/store',
  children,
}) {
  return (
    <Box px={[4, 6, 12]} py={[8]}>
      {blockName && (
        <Stack
          direction={['column', 'column', 'row']}
          justify="space-between"
          mb={[4, 8]}
        >
          <Heading>{blockName}</Heading>
          {rightButtonName && (
            <Text d="flex" alignItems="center" as={Link} to={to}>
              {rightButtonName} <Icon ml={2} as={FaChevronRight} />
            </Text>
          )}
        </Stack>
      )}
      {children}
    </Box>
  );
}
