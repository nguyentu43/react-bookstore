import {
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaHeart,
  FaUserAlt,
  FaShoppingBag,
  FaSlidersH,
  FaSignInAlt,
} from 'react-icons/fa';
import RightDrawer from '../Drawer/RightDrawer';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function TopNav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { items } = useSelector(state => state.cart);
  const { isLogin, isAdmin } = useSelector(state => state.auth);

  const bookTotal = useMemo(() => {
    return items.reduce((prev, item) => prev + item.quantity, 0);
  }, [items]);

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
      <HStack spacing={4}>

        {isLogin && <>
          <Tooltip label="Shopping Cart">
          <Text as={Link} to="/store/cart" color='orange.500'>
            <Icon as={FaShoppingBag}/>
            {bookTotal === 0 ? '' : bookTotal}
          </Text>
        </Tooltip>

        <Tooltip label="Your wishlist books">
          <Link to="/store/wishlist">
            <Icon as={FaHeart} color="pink.500"/>
          </Link>
        </Tooltip></>
        }
        <Button size="xs" onClick={onOpen} colorScheme={isLogin ? "teal" : "blue"}>
        <Icon as={isLogin ? FaUserAlt : FaSignInAlt} mr="5px" />{isLogin ? 'My Account' : 'Login/Register'}
        </Button>


        {isLogin && isAdmin  && (
          <Button as={Link} size="xs" to="/admin">
            <Icon as={FaSlidersH} mr="5px" />Manage
          </Button>
        )}
      </HStack>
      <RightDrawer isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
