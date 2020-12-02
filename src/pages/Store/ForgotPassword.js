import { Box, Heading } from '@chakra-ui/react';
import BlockLayout from '../../components/Store/BlockLayout';
import RequestPasswordForm from '../../components/Store/Form/RequestPasswordForm';
import ResetPasswordForm from '../../components/Store/Form/ResetPasswordForm';

export default function ForgotPassword() {

    const isRequest = true;

  return (
    <BlockLayout>
      <Box px={["0", "20px", "100px", "400px"]}>
        <Heading mb={4}>{isRequest ? "Reset password" : "Create new password"}</Heading>
        {
            isRequest ? <RequestPasswordForm/> : <ResetPasswordForm/>
        }
      </Box>
    </BlockLayout>
  );
}
