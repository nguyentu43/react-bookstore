import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import LeftMenu from '../LeftMenu';

const LeftDrawer = forwardRef(({ isOpen, onClose }, ref) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MENU</DrawerHeader>

          <DrawerBody>
            <LeftMenu />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

export default LeftDrawer;
