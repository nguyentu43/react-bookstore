import { Box, Heading } from '@chakra-ui/react';
import BlockLayout from '../../components/Store/BlockLayout';
import RegisterForm from '../../components/Store/Form/RegisterForm';

export default function Login() {
  return (
    <BlockLayout>
      <Box px={["0", "20px", "100px", "400px"]}>
        <Heading mb={4}>Register</Heading>
        <RegisterForm />
      </Box>
    </BlockLayout>
  );
}