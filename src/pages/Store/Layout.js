import { Box } from '@chakra-ui/react';
import BottomFooter from '../../components/Store/Footer/BottomFooter';
import BottomNav from '../../components/Store/Nav/BottomNav';
import TopFooter from '../../components/Store/Footer/TopFooter';
import TopNav from '../../components/Store/Nav/TopNav';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api';

export default function Layout({ children }) {

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { categories } = await fetchCategories();
        setCategories(categories.filter(c => !c.parent));
      }
      catch(error){
        alert(error)
      }
    }
    fetchData();
  }, []);

  if(!categories){
    return 'loading.....';
  }

  return (
    <Box>
      <Box id="header">
        <TopNav/>
        <BottomNav categories={categories} />
      </Box>
      <Box id="main">{children}</Box>
      <Box id="footer">
        <TopFooter />
        <BottomFooter />
      </Box>
    </Box>
  );
}
