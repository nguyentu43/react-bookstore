import { Icon } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import ReactRating from 'react-rating';

export default function Rating({ readonly, value, onChange, size }) {
  return (
    <ReactRating
      emptySymbol={<Icon h={size} w={size} color="yellow.400" as={FaRegStar} />}
      fullSymbol={<Icon color="yellow.400" h={size} w={size} as={FaStar} />}
      placeholderRating={value}
      onChange={onChange}
      placeholderSymbol={
        <Icon color="yellow.400" h={size} w={size} as={FaStar} />
      }
      readonly={readonly}
    />
  );
}
