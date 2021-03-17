import { useEffect, useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import { Button, Checkbox, Input, useToast } from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';
import { fetchUsers, updateUser, addUser, removeUser } from '../../api';
import random from 'crypto-random-string';

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
          return <EmailInput />;
        },
      },
      {
        Header: 'Admin',
        accessor: 'isAdmin',
        id: 'isAdmin',
        Cell: data => {
          const AdminCheckbox = customInput(
            Checkbox,
            data,
            [],
            false,
            'sm',
            'isChecked'
          );
          return <AdminCheckbox />;
        },
      },
      {
        Header: 'Password',
        accessor: 'password',
        id: 'password',
        Cell: data => {
          const PasswordInput = customInput(Input, data, ['required'], true);
          return (
            <PasswordInput
              type="password"
              placeholder="Click lock icon to edit"
            />
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value, remove }) => (
          <ConfirmButton
            size="sm"
            onAccept={() => remove({ id: value })}
            colorScheme="red"
            buttonText="Delete"
          />
        ),
      },
    ],
    []
  );

  const [users, setUsers] = useState([]);
  const [skipPageReset, setSkipReset] = useState(false);
  const toast = useToast();

  const action = {
    async save({ id, name, email, password }) {
      try {
        setSkipReset(true);
        await updateUser({ id, input: { name, email, password } });
        toast({ status: 'info', title: 'User has been updated' });
        fetchData();
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    },
    async remove({ id }) {
      try {
        setSkipReset(true);
        await removeUser({ id });
        fetchData();
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    },
  };

  async function fetchData() {
    try {
      const { users } = await fetchUsers();
      setUsers(users);
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  async function add() {
    try {
      setSkipReset(true);
      await addUser({
        input: {
          name: 'New User',
          email: random({ length: 10 }) + '@example.xyz',
          password: '123123',
        },
      });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSkipReset(false);
  }, [users]);

  return (
    <BlockLayout blockName="User Table">
      <Button colorScheme="blue" my={2} onClick={add}>
        Add
      </Button>
      <Table
        columns={columns}
        data={users}
        action={action}
        skipPageReset={skipPageReset}
      />
    </BlockLayout>
  );
}
