import { Skeleton, VStack } from '@chakra-ui/react';

export default function LoadingDataSkeleton({ loading, line = 5, children }) {
  if (loading) {
    return (
      <VStack align="stretch">
        {Array.from({ length: line }).map((_, i) => (
          <Skeleton height="25px" key={i} />
        ))}
      </VStack>
    );
  }

  return children;
}
