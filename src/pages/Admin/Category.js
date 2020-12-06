import { useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import * as FcIcon from 'react-icons/fc';
import { Button, Input, Select } from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';

export default function Category() {
  const iconNameList = useMemo(() => Object.keys(FcIcon), []);

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
        accessor: 'parent.name',
        id: "parent",
        Cell: data => {
          const ParentInput = customInput(Select, data);
          return <ParentInput>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </ParentInput>;
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
        icon: 'FcAlarmClock',
        id: '1',
        parent: { name: 'Parent' },
      },
      {
        name: 'ABFC',
        icon: 'FcAlarmClock',
        id: '2',
        parent: { name: 'Parent 2' },
      },
    ],
    []
  );

  return (
    <BlockLayout blockName="Category Table">
      <Table columns={columns} data={data} />
    </BlockLayout>
  );
}
