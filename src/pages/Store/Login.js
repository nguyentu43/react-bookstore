import { Box, Heading } from '@chakra-ui/react';
import BlockLayout from '../../components/Store/BlockLayout';
import LoginForm from '../../components/Store/Form/LoginForm';
import withPrevent from '../../hocs/withPrevent';

export default withPrevent(function Login() {
  return (
    <BlockLayout>
      <Box px={['0', '20px', '100px', '400px']}>
        <Heading mb={4}>Login</Heading>
        <LoginForm />
      </Box>
    </BlockLayout>
  );
});
