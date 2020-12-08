import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import {Editor} from '@tinymce/tinymce-react';
import ImagePicker from '../ImagePicker';

export default function ProductEditForm({ row }) {
  const { handleSubmit, control, errors } = useForm();
  const [deal, setDeal] = useState(false);
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const categoryOptions = [
    { value: '1', label: 'Child' },
    { value: '2', label: 'Teen' },
  ];
  const authorOptions = [
    { value: '1', label: 'Child' },
    { value: '2', label: 'Teen' },
  ];

  function handleCheckDeal(e) {
    setDeal(e.target.checked);
  }

  function handleSave(data) {
    console.log(data);
  }

  return (
    <Box maxW={450}>
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
              as={Input}
              type="number"
              min={0}
              defaultValue={1}
              rules={{ required: true }}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.discount}>
            <FormLabel htmlFor="discount">Enter discount:</FormLabel>
            <Controller
              name="discount"
              id="discount"
              control={control}
              as={Input}
              type="number"
              min={0}
              defaultValue={0}
              rules={{ required: true }}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.images}>
            <FormLabel htmlFor="images">Images:</FormLabel>
            <Controller
              name="images"
              id="images"
              control={control}
              rules={{ required: true }}
              render={({onChange, value}) => (<ImagePicker images={value} onChange={onChange}/>)}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="discount">Enter description:</FormLabel>
            <Controller
              name="description"
              id="description"
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Editor initialValue={value} onEditorChange={onChange}/>
              )}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Is Deal?</FormLabel>
            <Checkbox value={deal} onChange={handleCheckDeal} />
          </FormControl>

          {deal && (
            <>
              <FormControl isInvalid={errors.dealDiscount}>
                <FormLabel htmlFor="dealDiscount">
                  Enter deal discount:
                </FormLabel>
                <Controller
                  name="dealDiscount"
                  id="dealDiscount"
                  control={control}
                  as={Input}
                  type="number"
                  min={0}
                  defaultValue={0}
                  rules={{ required: true }}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.dealQuantity}>
                <FormLabel htmlFor="dealQuantity">
                  Enter deal quantity:
                </FormLabel>
                <Controller
                  name="dealQuantity"
                  id="dealQuantity"
                  control={control}
                  as={Input}
                  type="number"
                  min={1}
                  defaultValue={1}
                  rules={{ required: true }}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.beginDate}>
                <FormLabel htmlFor="begnDate">Enter begin date:</FormLabel>
                <Controller
                  name="beginDate"
                  id="beginDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange, value }) => {
                    setBeginDate(value);
                    return (
                      <Input
                        as={ReactDatePicker}
                        endDate={endDate}
                        startDate={value}
                        selected={value}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.endDate}>
                <FormLabel htmlFor="discount">Enter end date:</FormLabel>
                <Controller
                  name="endDate"
                  id="endDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange, value }) => {
                    setEndDate(value);
                    return (
                      <Input
                        as={ReactDatePicker}
                        selected={value}
                        startDate={beginDate}
                        endDate={value}
                        minDate={beginDate}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            </>
          )}

          <Button size="sm" colorScheme="green" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
