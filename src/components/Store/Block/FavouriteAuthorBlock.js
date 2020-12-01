
import Author from '../Author';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';

export default function FavouriteAuthorBlock() {

  return (
    <BlockLayout blockName="Favourite Authors" rightButtonName="View All">
      <CarouselWrapper slidesToShow={5} arrows={true} dots={false}>
        <Author />
        <Author />
        <Author />
        <Author />
        <Author />
        <Author />
      </CarouselWrapper>
    </BlockLayout>
  );
}
