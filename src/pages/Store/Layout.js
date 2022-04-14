/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useToast } from '@chakra-ui/react';
import BottomFooter from '../../components/Store/Footer/BottomFooter';
import BottomNav from '../../components/Store/Nav/BottomNav';
import TopNav from '../../components/Store/Nav/TopNav';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api';

export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const { categories } = await fetchCategories();
        setCategories(categories.filter(c => !c.parent));
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      <Box id="header">
        <TopNav />
        <BottomNav categories={categories} />
      </Box>
      <Box id="main">{children}</Box>
      <Box id="footer">
        <BottomFooter />
      </Box>
    </Box>
  );
}
