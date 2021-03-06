import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import LoginForm from '../Form/LoginForm';
import { forwardRef } from 'react';
import { logout } from '../../../api';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../../context';
import { setAuth, setCart } from '../../../context/actions';

const RightDrawer = forwardRef(({ isOpen, onClose }, ref) => {
  const {
    state: { auth },
    dispatch,
  } = useAppContext();
  const history = useHistory();

  function handleLogout() {
    logout();
    dispatch(setAuth({ isLogin: false }));
    dispatch(setCart([]));
    history.push('/store');
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Icon mr={2} as={FaUserAlt} />
            Account
          </DrawerHeader>

          <DrawerBody>
            {auth.isLogin ? (
              <VStack align="flex-start">
                <Button as={Link} to="/store/order" colorScheme="green">
                  Order
                </Button>
                <Button onClick={handleLogout} colorScheme="red">
                  Logout
                </Button>
              </VStack>
            ) : (
              <LoginForm onCloseDraw={onClose} inDrawer={true} />
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

export default RightDrawer;
