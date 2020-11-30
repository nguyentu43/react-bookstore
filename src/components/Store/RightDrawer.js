import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import Login from './Login';
import { forwardRef } from 'react';

const RightDrawer = forwardRef(({ isOpen, onClose }, ref) => {
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
            <Login />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

export default RightDrawer;
