import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import LoginForm from '../Form/LoginForm';
import { forwardRef } from 'react';
import { logout } from '../../../api';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../../context';

const RightDrawer = forwardRef(({ isOpen, onClose }, ref) => {
  const {
    state: { auth },
    dispatch
  } = useAppContext();
  const history = useHistory();

  function handleLogout(){
    logout();
    dispatch({ type: 'SET_AUTH', payload: { isLogin: false } });
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
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <LoginForm inDrawer={true} />
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

export default RightDrawer;
