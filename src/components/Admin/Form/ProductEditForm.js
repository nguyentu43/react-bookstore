import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import ImagePicker from '../ImagePicker';

export default function ProductEditForm({
  product,
  save,
  categoryOptions,
  authorOptions,
}) {
  const { handleSubmit, control, errors } = useForm({ defaultValues: product });

  function handleSave(data) {
    const input = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
      images: JSON.stringify(data.images.map(image => image.public_id)),
      category: data.category.value,
      authors: data.authors.map(author => author.value),
    };
    save({ id: product.id, input });
  }

  return (
    <Box maxW={600}>
      <form onSubmit={handleSubmit(data => handleSave(data))}>
        <VStack align="flex-start">
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Enter Product Name:</FormLabel>
            <Controller
              placeholder="Enter book name"
              id="name"
              name="name"
              as={Input}
              rules={{ required: true }}
              defaultValue=""
              control={control}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.category}>
            <FormLabel htmlFor="category">Choose a category:</FormLabel>
            <Controller
              id="category"
              name="category"
              rules={{ required: true }}
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <Select
                  onChange={onChange}
                  options={categoryOptions}
                  value={value}
                  isSearchable={true}
                />
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.authors}>
            <FormLabel htmlFor="authors">Choose authors:</FormLabel>
            <Controller
              name="authors"
              id="authors"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Select
                  options={authorOptions}
                  value={value}
                  onChange={onChange}
                  isMulti={true}
                  isSearchable={true}
                />
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.price}>
            <FormLabel htmlFor="price">Enter price:</FormLabel>
            <Controller
              name="price"
              id="price"
              control={control}
              defaultValue={1}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <NumberInput
                  onChange={onChange}
                  value={value}
                  step={0.01}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.discount}>
            <FormLabel htmlFor="discount">Enter discount:</FormLabel>
            <Controller
              name="discount"
              id="discount"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <NumberInput
                  onChange={onChange}
                  value={value}
                  step={0.01}
                  min={0}
                  max={1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.images}>
            <FormLabel htmlFor="images">Images:</FormLabel>
            <Controller
              name="images"
              id="images"
              control={control}
              defaultValue={[]}
              rules={{ validate: value => value.length > 0 }}
              render={({ onChange, value }) => (
                <ImagePicker images={value} onChange={onChange} />
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="discount">Enter description:</FormLabel>
            <Controller
              name="description"
              id="description"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Editor
                  apiKey={process.env.REACT_APP_TINYMCE_API}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                  }}
                  initialValue={value}
                  onEditorChange={onChange}
                />
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <Button size="sm" colorScheme="green" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
