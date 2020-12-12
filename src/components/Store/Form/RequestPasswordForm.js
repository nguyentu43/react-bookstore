import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import { useForm, Controller } from 'react-hook-form';
  import {requestResetPassword} from '../../../api';
  
  export default function RequestPasswordForm() {
    const { handleSubmit, errors, control } = useForm();

    async function handleRequest(data){
      try{
        await requestResetPassword(data);
        alert(true);
      }
      catch(error){
        alert(error);
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
          <Button type="submit">
            Send Email
          </Button>
        </VStack>
      </form>
    );
  }
  