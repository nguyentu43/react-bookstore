import { useEffect, useState } from 'react';
import { fetchAuthors } from '../../../api';
import LoadingDataSkeleton from '../../LoadingDataSkeleton';
import Author from '../Author';
import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';

export default function FavouriteAuthorBlock() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { authors } = await fetchAuthors();
      setAuthors(authors);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout blockName="Favourite Authors">
      <LoadingDataSkeleton loading={loading}>
        <CarouselWrapper slidesToShow={5} arrows={true} dots={false}>
          {authors.map(author => (
            <Author key={author.id} {...author} />
          ))}
        </CarouselWrapper>
      </LoadingDataSkeleton>
    </BlockLayout>
  );
}
