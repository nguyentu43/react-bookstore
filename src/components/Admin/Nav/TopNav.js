import { Avatar, HStack, Icon, IconButton } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { FcMenu } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function TopNav({ onToggle }) {
  return (
    <HStack borderBottomWidth={1} h="60px" px={2} align="center">
      <IconButton onClick={onToggle} icon={<Icon as={FcMenu} />} />
      <HStack justify="flex-end" flex="1">
        <Link to="/store">
          <Icon as={FaHome} w={8} h={8} />
        </Link>
        <Avatar size="sm" />
      </HStack>
    </HStack>
  );
}
