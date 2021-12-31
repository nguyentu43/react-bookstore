import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addRating, updateRating } from '../../../api';
import Rating from '../Rating';

export default function CommentForm({ data = {}, productID, onPost }) {
  const { handleSubmit, errors, control, reset } = useForm({
    defaultValues: data,
  });

  const {id} = useSelector(state => state.auth);

  async function saveComment(input) {
    if (!data.id) {
      await addRating({ input, userID: id, productID });
      reset();
    } else {
      await updateRating({ input, userID: id, id: data.id });
    }
    onPost();
  }

  return (
    <form onSubmit={handleSubmit(data => saveComment(data))}>
      <VStack align="flex-start" p={4} borderWidth={1} borderRadius="md" mb={4}>
        <Heading size="md"> {!data.id ? "Leave some feedback about this book" : "Edit rating"}</Heading>
        <FormControl isInvalid={errors.title}>
          <Controller
            id="title"
            name="title"
            as={Input}
            placeholder="Enter title"
            defaultValue=""
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.comment}>
          <Controller
            id="comment"
            name="comment"
            as={Textarea}
            placeholder="Enter content"
            defaultValue=""
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.rate}>
          <Controller
            id="rate"
            name="rate"
            rules={{ required: true }}
            control={control}
            defaultValue={0}
            render={({ onChange, value }) => (
              <Rating
                value={value}
                size={5}
                onChange={onChange}
              />
            )}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Post
        </Button>
      </VStack>
    </form>
  );
}
