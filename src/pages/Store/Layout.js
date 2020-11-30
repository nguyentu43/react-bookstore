import { Box } from '@chakra-ui/react';
import BottomFooter from '../../components/Store/BottomFooter';
import BottomNav from '../../components/Store/BottomNav';
import TopFooter from '../../components/Store/TopFooter';
import TopNav from '../../components/Store/TopNav';

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
