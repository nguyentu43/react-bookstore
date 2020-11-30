import BannerCarousel from '../../components/Store/BannerCarousel';
import BestSellingBlock from '../../components/Store/BestSellingBlock';
import FavouriteAuthorBlock from '../../components/Store/FavouriteAuthorBlock';
import FeaturedBookBlock from '../../components/Store/FeaturedBookBlock';
import FeaturedCategoryBlock from '../../components/Store/FeaturedCategoryBlock';
import NewReleaseBlock from '../../components/Store/NewReleaseBlock';
import WeekDealBlock from '../../components/Store/WeekDealBlock';

export default function Index() {
  return (
    <>
      <BannerCarousel />
      <FeaturedCategoryBlock />
      <BestSellingBlock/>
      <FeaturedBookBlock/>
      <WeekDealBlock/>
      <NewReleaseBlock/>
      <FavouriteAuthorBlock/>
    </>
  );
}
