import BannerCarousel from '../../components/Store/BannerCarousel';
import BestSellingBlock from '../../components/Store/Block/BestSellingBlock';
import FavouriteAuthorBlock from '../../components/Store/Block/FavouriteAuthorBlock';
import FeaturedBookBlock from '../../components/Store/Block/FeaturedBookBlock';
import FeaturedCategoryBlock from '../../components/Store/Block/FeaturedCategoryBlock';
import NewReleaseBlock from '../../components/Store/Block/NewReleaseBlock';
import RecommendationBlock from '../../components/Store/Block/RecommendationBlock';
import WeekDealBlock from '../../components/Store/Block/WeekDealBlock';
import useAppContext from '../../context';

export default function Index() {
  const {state:{auth}} = useAppContext();
  return (
    <>
      <BannerCarousel />
      <FeaturedCategoryBlock />
      { auth.isLogin && <RecommendationBlock/> }
      <BestSellingBlock />
      <FeaturedBookBlock />
      <WeekDealBlock />
      <NewReleaseBlock />
      <FavouriteAuthorBlock />
    </>
  );
}
