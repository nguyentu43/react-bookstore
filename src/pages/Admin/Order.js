import { Button, HStack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import CurrencyFormat from 'react-currency-format';
import BlockLayout from '../../components/Admin/BlockLayout';
import ConfirmButton from '../../components/ConfirmButton';
import Table from '../../components/Table';
import OrderEditForm from '../../components/Admin/Form/OrderEditForm';

export default function OrderPage() {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ value }) => (
          <CurrencyFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        ),
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value, row }) => {
          return (
            <HStack>
              <Button
                as="span"
                {...row.getToggleRowExpandedProps()}
                size="sm"
                colorScheme="green"
              >
                Edit
              </Button>
              <ConfirmButton buttonText="Delete" colorScheme="red" size="sm" />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: 'Book 1',
        total: 1234,
        address: 'abc city',
        status: 'ordered',
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback((row) => (<OrderEditForm row={row}/>));

  return (
    <BlockLayout blockName="Order Table">
      <Table columns={columns} showPagination={true} renderRowSubComponent={renderRowSubComponent} data={data} />
    </BlockLayout>
  );
}
