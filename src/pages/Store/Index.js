import BannerCarousel from '../../components/Store/BannerCarousel';
import BestSellingBlock from '../../components/Store/Block/BestSellingBlock';
import FavouriteAuthorBlock from '../../components/Store/Block/FavouriteAuthorBlock';
import FeaturedBookBlock from '../../components/Store/Block/FeaturedBookBlock';
import FeaturedCategoryBlock from '../../components/Store/Block/FeaturedCategoryBlock';
import NewReleaseBlock from '../../components/Store/Block/NewReleaseBlock';
import WeekDealBlock from '../../components/Store/Block/WeekDealBlock';

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
