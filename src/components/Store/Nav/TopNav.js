import { Flex, HStack, Icon, Text, useDisclosure } from '@chakra-ui/react';
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaHeart,
  FaUserAlt,
  FaShoppingBag,
  FaSlidersH,
} from 'react-icons/fa';
import RightDrawer from '../Drawer/RightDrawer';
import ColorModeSwitcher from '../../ColorModeSwitcher';
import { Link } from 'react-router-dom';

export default function TopNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack
      px={[4, 6, 12]}
      py={2}
      borderBottomWidth={1}
      justify={['center', 'center', 'space-between']}
    >
      <HStack spacing={8} d={['none', 'none', 'flex']}>
        <Flex align="center">
          <Icon mr={2} as={FaQuestionCircle} /> Can we help you?
        </Flex>
        <Flex align="center">
          <Icon mr={2} as={FaPhoneAlt} /> +1 245-345-789
        </Flex>
      </HStack>
      <HStack spacing={8}>
        <Link to="/store/wishlist">
          <Icon as={FaHeart} />
        </Link>
        <Link to="/admin">
          <Icon as={FaSlidersH} />
        </Link>
        <Text>
          <Icon
            _hover={{ cursor: 'pointer' }}
            onClick={onOpen}
            as={FaUserAlt}
          />
        </Text>
        <Link to="/store/cart">
          <Icon as={FaShoppingBag} />
        </Link>
        <Text>
          <ColorModeSwitcher />
        </Text>
      </HStack>
      <RightDrawer isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
