import { Avatar, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaFlag, FaMailBulk, FaSearch } from 'react-icons/fa';
import { FcMenu } from 'react-icons/fc';

export default function TopNav({ onToggle }) {
  return (
    <HStack borderBottomWidth={1} h="60px" px={2} align="center">
      <IconButton onClick={onToggle} icon={<Icon as={FcMenu} />} />
      <InputGroup maxW={400}>
        <InputLeftElement pointerEvents="none" children={<Icon as={FaSearch} />} />
        <Input />
      </InputGroup>
      <HStack justify="flex-end" flex="1">
          <Icon w={8} h={8} as={FaMailBulk}/>
          <Icon w={8} h={8} as={FaFlag}/>
          <Avatar
          size="sm"
          src="https://i.pinimg.com/originals/f5/1d/08/f51d08be05919290355ac004cdd5c2d6.png"
        />
      </HStack>
    </HStack>
  );
}
