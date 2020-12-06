import { useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';

export default function User() {

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: data => {
          const NameInput = customInput(Input, data, ['required']);
          return <NameInput />;
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
        Cell: data => {
          const EmailInput = customInput(Input, data, ['required', 'email']);
          return <EmailInput/>;
        },
      },
      {
        Header: 'Admin',
        accessor: 'isAdmin',
        id: 'isAdmin',
        Cell: data => {
          const AdminCheckbox = customInput(Checkbox, data);
          return <AdminCheckbox />;
        },
      },
      {
        Header: 'Password',
        accessor: 'password',
        id: 'password',
        Cell: data => {
          const PasswordInput = customInput(Input, data, ['required'], true);
          return <PasswordInput type="password" placeholder="Click lock icon to edit"/>;
        },
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value }) => (
          <ConfirmButton size="sm" colorScheme="red" buttonText="Delete" />
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: 'ABC',
        email: 'abc@abc.com',
        id: '1',
        isAdmin: true
      },
      {
        name: 'ABFC',
        icon: 'FcAlarmClock',
        id: '2',
        isAdmin: false
      },
    ],
    []
  );

  return (
    <BlockLayout blockName="User Table">
      <Table columns={columns} data={data} />
    </BlockLayout>
  );
}
