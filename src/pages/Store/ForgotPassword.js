import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BlockLayout from '../../components/Store/BlockLayout';
import RequestPasswordForm from '../../components/Store/Form/RequestPasswordForm';
import ResetPasswordForm from '../../components/Store/Form/ResetPasswordForm';
import withPrevent from '../../hocs/withPrevent';

export default withPrevent(function ForgotPassword() {

  const [token, setToken] = useState(null);
  const {location} = useHistory();

  useEffect(() => {
    for(const sub of location.search.substr(1).split('&')){
      const params = sub.split('=');
      if(params[0] === 'token'){
        setToken(params[1]);
      }
    }
  }, []);

  return (
    <BlockLayout>
      <Box px={['0', '20px', '100px', '400px']}>
        <Heading mb={4}>
          {!token ? 'Reset password' : 'Create new password'}
        </Heading>
        {!token ? <RequestPasswordForm /> : <ResetPasswordForm token={token} />}
      </Box>
    </BlockLayout>
  );
});
