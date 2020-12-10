import { useEffect, useState } from 'react';
import { FaNetworkWired } from 'react-icons/fa';
import { fetchAuthors, fetchCategories, fetchProducts } from '../../api';
import BannerCarousel from '../../components/Store/BannerCarousel';
import BestSellingBlock from '../../components/Store/Block/BestSellingBlock';
import FavouriteAuthorBlock from '../../components/Store/Block/FavouriteAuthorBlock';
import FeaturedBookBlock from '../../components/Store/Block/FeaturedBookBlock';
import FeaturedCategoryBlock from '../../components/Store/Block/FeaturedCategoryBlock';
import NewReleaseBlock from '../../components/Store/Block/NewReleaseBlock';
import WeekDealBlock from '../../components/Store/Block/WeekDealBlock';

export default function Index() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { authors } = await fetchAuthors();
        const data = await fetchCategories();
        const categories = data.categories
          .filter(c => c.parent === null)
          .slice(0, 4);

        for (const category of categories) {
          category.products = (await fetchProducts({
            search: 'order=4&category=' + category.id,
            limit: 9,
          })).products;
        }

        const { products: bestSellingBooks } = await fetchProducts({
          search: 'order=0',
          limit: 10,
        });

        const { products: featuredBooks } = await fetchProducts({
          limit: 10,
        });

        const { products: saleBooks } = await fetchProducts({
          search: 'order=4',
          limit: 10,
        });

        const { products: newestBooks } = await fetchProducts({
          search: 'order=1',
          limit: 10,
        });

        const { products: dealBooks } = await fetchProducts({
          search: 'range=1-25',
          limit: 10,
        });

        setData({
          bestSellingBooks,
          authors,
          saleBooks,
          featuredBooks,
          newestBooks,
          dealBooks,
          categories,
        });
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, []);

  if (!data) return 'loading';

  return (
    <>
      <BannerCarousel />
      <FeaturedCategoryBlock categories={data.categories} />
      <BestSellingBlock products={data.bestSellingBooks} />
      <FeaturedBookBlock
        featuredBooks={data.featuredBooks}
        newestBooks={data.newestBooks}
        saleBooks={data.saleBooks}
      />
      <WeekDealBlock products={data.dealBooks} />
      <NewReleaseBlock categories={data.categories} />
      <FavouriteAuthorBlock authors={data.authors} />
    </>
  );
}
