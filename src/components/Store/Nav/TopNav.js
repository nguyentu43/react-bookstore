import { Flex, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaMarsStrokeH,
  FaHeart,
  FaUserAlt,
  FaShoppingBag,
} from 'react-icons/fa';
import RightDrawer from '../Drawer/RightDrawer';
import ColorModeSwitcher from '../../ColorModeSwitcher';

export default function TopNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack px={[4, 6, 12]} py={2} borderBottomWidth={1} justify={["center", "center", "space-between"]}>
      <HStack spacing={8} d={["none", "none", "flex"]}>
        <Flex align="center">
          <Icon mr={2} as={FaQuestionCircle} /> Can we help you?
        </Flex>
        <Flex align="center">
          <Icon mr={2} as={FaPhoneAlt} /> +1 245-345-789
        </Flex>
      </HStack>
      <HStack spacing={8}>
        <Icon as={FaMarsStrokeH} />
        <Icon as={FaHeart} />
        <Icon
          _hover={{ cursor: 'pointer' }}
          onClick={onOpen}
          as={FaUserAlt}
        />
        <Icon as={FaShoppingBag} />
        <ColorModeSwitcher/>
      </HStack>
      <RightDrawer isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
