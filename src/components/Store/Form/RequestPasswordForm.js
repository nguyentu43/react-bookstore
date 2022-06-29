import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
  useBoolean
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { requestResetPassword } from '../../../api';

export default function RequestPasswordForm() {
  const { handleSubmit, errors, control } = useForm();
  const toast = useToast();
  const [loadingButtonState, loadingButtonAction] = useBoolean(false);

  async function handleRequest(data) {
    try {
      loadingButtonAction.on();
      await requestResetPassword(data);
      toast({ title: 'A email has been sent. Check your email' });
    } catch (error) {
      toast({ title: 'Send mail error', status: 'error' });
    } finally{
      loadingButtonAction.off();
    }
  }

  return (
    <form onSubmit={handleSubmit(data => handleRequest(data))}>
      <VStack align="stretch" p={4} borderWidth={1} borderRadius="md">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Controller
            id="email"
            name="email"
            as={Input}
            placeholder="Please enter your email"
            defaultValue=""
            rules={{ required: true, min: 6 }}
            control={control}
          />
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={loadingButtonState}>Send Email</Button>
      </VStack>
    </form>
  );
}
