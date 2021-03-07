import { Heading, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { useAppContext } from '../../context';
import moment from 'moment';
import CommentForm from '../Store/Form/CommentForm';
import { useState } from 'react';
import { removeRating } from '../../api';
import ConfirmButton from '../ConfirmButton';
import Rating from './Rating';

export default function Comment({ data, onRemove, onPost, productID }) {
  const [edit, setEdit] = useState(false);
  const {
    state: { auth },
  } = useAppContext();

  async function remove() {
    await removeRating({ id: data.id });
    onRemove();
  }

  if (edit) {
    return (
      <CommentForm
        data={data}
        productID={productID}
        onPost={() => {
          setEdit(false);
          onPost();
        }}
      />
    );
  }

  return (
    <VStack align="flex-start" p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Heading size="sm">{data.title}</Heading>
      <Text>
        {data.user.name} | {moment(Number(data.createdAt)).fromNow()}
      </Text>
      <Rating readonly={true} size={5} value={data.rate} />
      <Text>{data.comment}</Text>
      {auth.isLogin && (auth.isAdmin || auth.id === data.user.id) && (
        <HStack>
          <Button size="sm" colorScheme="green" onClick={() => setEdit(true)}>
            Edit
          </Button>
          <ConfirmButton
            size="sm"
            buttonText="Delete"
            colorScheme="red"
            onAccept={remove}
          />
        </HStack>
      )}
    </VStack>
  );
}
