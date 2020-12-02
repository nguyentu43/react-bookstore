import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  GridItem,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import LeftNav from '../../components/Admin/Nav/LeftNav';
import TopNav from '../../components/Admin/Nav/TopNav';

export default function Layout({ children }) {

  const { isOpen, onToggle, onClose } = useDisclosure();

  const enableDrawer = useBreakpointValue({sm: true, md: false, lg: false, xl: false, base: true});

  return (
    <>
      <SimpleGrid columns={5}>
        {isOpen && !enableDrawer && <GridItem >
          <LeftNav />
        </GridItem>}
        <GridItem colSpan={ enableDrawer ? 5 : isOpen ? 4 : 5}>
          <TopNav onToggle={onToggle} />
          <Box p={4}>{children}</Box>
        </GridItem>
      </SimpleGrid>
      <Drawer isOpen={isOpen && enableDrawer} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <LeftNav />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
