import { Box } from '@chakra-ui/react';
import BottomFooter from '../../components/Store/Footer/BottomFooter';
import BottomNav from '../../components/Store/Nav/BottomNav';
import TopFooter from '../../components/Store/Footer/TopFooter';
import TopNav from '../../components/Store/Nav/TopNav';

export default function Layout({ children }) {
  return (
    <Box>
      <Box id="header">
        <TopNav />
        <BottomNav />
      </Box>
      <Box id="main">{children}</Box>
      <Box id="footer">
        <TopFooter />
        <BottomFooter />
      </Box>
    </Box>
  );
}
