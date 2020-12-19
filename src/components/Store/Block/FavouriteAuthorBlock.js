import { useEffect, useState } from 'react';
import { fetchAuthors } from '../../../api';
import Author from '../Author';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';

export default function FavouriteAuthorBlock() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { authors } = await fetchAuthors();
      setAuthors(authors);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout blockName="Favourite Authors">
      <CarouselWrapper slidesToShow={5} arrows={true} dots={false}>
        {authors.map(author => (
          <Author key={author.id} {...author} />
        ))}
      </CarouselWrapper>
    </BlockLayout>
  );
}
