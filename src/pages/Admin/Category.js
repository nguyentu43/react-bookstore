/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import * as FcIcon from 'react-icons/fc';
import { Button, Input, Select, useToast } from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';
import {
  fetchCategories,
  updateCategory,
  removeCategory,
  addCategory,
} from '../../api';

export default function Category() {
  const iconNameList = useMemo(() => Object.keys(FcIcon), []);

  async function fetchData() {
    try {
      const { categories } = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Icon',
        accessor: 'icon',
        Cell: data => {
          const IconSelect = customInput(Select, data);
          return (
            <IconSelect>
              {iconNameList.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </IconSelect>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: data => {
          const NameInput = customInput(Input, data, ['required']);
          return <NameInput />;
        },
      },
      {
        Header: 'Parent',
        accessor: 'parent.id',
        id: 'parentID',
        Cell: table => {
          const ParentInput = customInput(Select, table);
          return (
            <ParentInput>
              <option value="0">Choose parent</option>
              {table.data
                .filter(
                  category =>
                    category.parent === null &&
                    table.row.original.id !== category.id
                )
                .map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </ParentInput>
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
    [iconNameList]
  );

  const [categories, setCategories] = useState([]);
  const [skipPageReset, setSkipPage] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSkipPage(false);
  }, [categories]);

  const action = {
    save: async ({ id, name, parentID, icon }) => {
      try {
        setSkipPage(true);
        await updateCategory({ id, input: { name, parentID, icon } });
        toast({ status: 'info', title: 'Category has been updated' });
        fetchData();
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    },
    remove: async ({ id }) => {
      try {
        setSkipPage(true);
        await removeCategory({ id });
        fetchData();
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    },
  };

  async function add() {
    try {
      setSkipPage(true);
      await addCategory({ input: { name: 'New Category' } });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  return (
    <BlockLayout blockName="Category Table">
      <Button colorScheme="blue" my={2} onClick={add}>
        Add
      </Button>
      <Table
        skipPageReset={skipPageReset}
        columns={columns}
        data={categories}
        action={action}
      />
    </BlockLayout>
  );
}
