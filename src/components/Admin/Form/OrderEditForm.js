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

export default function OrderEditForm({
  order,
  userOptions,
  productOptions,
  statusOptions,
  save
}) {
  const { handleSubmit, control, errors } = useForm({ defaultValues: order });

  function handleSave(data) {
    const userID = data.user.value;
    delete data.user;
    const input = {
      ...data,
      status: data.status.value,
      total: data.items.reduce((prev, item) => prev + item.price * (1-item.discount) * item.quantity, 0),
      items: data.items.map(({id, discount, price, quantity}) => ({id, discount, price, quantity}))
    }
    save({input, id: order.id, userID});
  }

  return (
    <Box maxW={450}>
      <form onSubmit={handleSubmit(data => handleSave(data))}>
        <VStack align="flex-start">
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="user">Choose Customer:</FormLabel>
            <Controller
              placeholder="Enter customer name"
              id="user"
              name="user"
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => {
                return (
                  <Select
                    options={userOptions}
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
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="phone">Customer Phone:</FormLabel>
            <Controller
              placeholder="Enter phone"
              id="phone"
              name="phone"
              as={Input}
              rules={{ required: true }}
              control={control}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.address}>
            <FormLabel htmlFor="admin">Address:</FormLabel>
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
          <FormControl isInvalid={errors.status}>
            <FormLabel htmlFor="status">Status:</FormLabel>
            <Controller
              placeholder="Choose status"
              id="status"
              name="status"
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => (
                <Select
                  options={statusOptions}
                  value={value}
                  onChange={onChange}
                />
              )}
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
              render={({ onChange, value }) => (
                <ProductPicker
                  productOptions={productOptions}
                  items={value}
                  onChange={onChange}
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
