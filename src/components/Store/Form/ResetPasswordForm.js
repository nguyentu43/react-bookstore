import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { verifyTokenAndResetPassword } from '../../../api';

export default function RequestPasswordForm({token}) {
  const { handleSubmit, errors, control } = useForm();

  async function handleReset({password}){
    try{
      await verifyTokenAndResetPassword({password, token});
      alert(true);
    }
    catch(error){
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(data => handleReset(data))}>
      <VStack align="stretch" p={4} borderWidth={1} borderRadius="md">
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">New password:</FormLabel>
          <Controller
            id="password"
            name="password"
            as={Input}
            type="password"
            defaultValue=""
            placeholder="Please enter your new password"
            rules={{ required: true }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="green">
          Create new password
        </Button>
      </VStack>
    </form>
  );
}
