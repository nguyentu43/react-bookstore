import Author from '../Author';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';

export default function FavouriteAuthorBlock({ authors }) {


  return (
    <BlockLayout blockName="Favourite Authors">
      <CarouselWrapper slidesToShow={5} arrows={true} dots={false}>
        {authors.map(author => (
          <Author
            key={author.id}
            {...author}
          />
        ))}
      </CarouselWrapper>
    </BlockLayout>
  );
}
