import { Box, Heading } from '@chakra-ui/react';
import BlockLayout from '../../components/Store/BlockLayout';
import LoginForm from '../../components/Store/Forms/LoginForm';

export default function Login() {
  return (
    <BlockLayout>
      <Box px={["0", "20px", "100px", "400px"]}>
        <Heading mb={4}>Login</Heading>
        <LoginForm />
      </Box>
    </BlockLayout>
  );
}
