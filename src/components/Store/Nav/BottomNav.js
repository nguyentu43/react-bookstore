import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaAlignJustify, FaChevronDown, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LeftDrawer from '../Drawer/LeftDrawer';

export default function BottomNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      px={[4, 6, 12]}
      py={6}
      borderBottomWidth={1}
      justify="space-between"
      align={["stretch", "stretch", "center"]}
    >
      <HStack spacing={[4, 8]}>
        <IconButton
          onClick={onOpen}
          size="md"
          icon={<Icon as={FaAlignJustify} />}
        />
        <Heading as={Link} to='/store'>Bookworm</Heading>
      </HStack>

      <Flex d={['none', 'none', 'none', 'flex']}>
        {[0, 0, 0, 0, 0].map((_, index) => (
          <Menu key={index}>
            <MenuButton
              p={4}
            >
              Actions <Icon as={FaChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        ))}
      </Flex>

      <Box w={["auto", "auto", 300]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} />}
          />
          <Input placeholder="Search by keyword" />
        </InputGroup>
      </Box>

      <LeftDrawer ref={btnRef} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
