import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function AddProductForm() {
  const { handleSubmit, errors, register } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <VStack align="stretch">
        <FormControl isInvalid={errors.format}>
          <FormLabel htmlFor="format">Book Format:</FormLabel>
          <Select
            id="format"
            name="format"
            defaultValue=""
            ref={register({ required: true })}
          >
            <option value="">Choose book format</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <HStack justify="space-between">
            <NumberInput defaultValue={1} min={1} max={20}>
              <NumberInputField name="quantity" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button type="submit" colorScheme="blue">ADD TO CART</Button>
          </HStack>
      </VStack>
    </form>
  );
}
