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
import { setAuth, setCart } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const RightDrawer = forwardRef(({ isOpen, onClose }, ref) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
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
                <Button as={Link} to="/store/order" onClick={onClose} colorScheme="green">
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
