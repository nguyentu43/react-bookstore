import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import ProductPicker from '../ProductPicker';

export default function OrderEditForm({ row }) {
  const { handleSubmit, control, errors } = useForm();

  const users = [
      {label: 'abc@abc.com', value: '1'},
      {label: 'abc1@abc.com', value: '2'},
  ];

  function handleSave(data) {
    console.log(data);
  }

  return (
    <Box maxW={450}>
      <form onSubmit={handleSubmit(data => handleSave(data))}>
        <VStack align="flex-start">
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="userID">Choose Customer:</FormLabel>
            <Controller
              placeholder="Enter book name"
              id="userID"
              name="userID"
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => {
                return (
                  <Select
                    options={users}
                    value={value}
                    onChange={onChange}
                    isSearchable={true}
                  />
                );
              }}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Customer Name:</FormLabel>
            <Controller
              placeholder="Enter name"
              id="name"
              name="name"
              as={Input}
              rules={{ required: true }}
              control={control}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.address}>
            <FormLabel htmlFor="name">Address:</FormLabel>
            <Controller
              placeholder="Enter address"
              id="address"
              name="address"
              as={Input}
              rules={{ required: true }}
              control={control}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.items}>
            <FormLabel htmlFor="name">Choose product:</FormLabel>
            <Controller
              id="items"
              name="items"
              rules={{ required: true }}
              control={control}
              render={({onChange, value}) => (<ProductPicker items={value} onChange={onChange}/>)}
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
