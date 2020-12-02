import { Box, Heading, Text } from '@chakra-ui/react';

export function Table({ header, footer, children, ...rest }) {
  return (
    <Box overflowX="auto" borderRadius="md" borderWidth={1}>
      <Box w="full" as="table" {...rest} >
        <thead>{header}</thead>
        <tbody>{children}</tbody>
        <tfoot>{footer}</tfoot>
      </Box>
    </Box>
  );
}

export function THeading({ children, ...rest }) {
  return (
    <Heading
      as="th"
      borderBottomWidth={3}
      py={4}
      px={2}
      textAlign="left"
      size="md"
      {...rest}
    >
      {children}
    </Heading>
  );
}

export function TData({ children, ...rest }) {
  return (
    <Text as="td" borderBottomWidth={1} px={2} py={4} {...rest}>
      {children}
    </Text>
  );
}

export function TRow({ children, ...rest }) {
  return (
    <Box _even={{ bg: 'gray.50' }} as="tr" {...rest}>
      {children}
    </Box>
  );
}
