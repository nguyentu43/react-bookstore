import { Button, HStack, Image } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import CurrencyFormat from 'react-currency-format';
import BlockLayout from '../../components/Admin/BlockLayout';
import ProductEditForm from '../../components/Admin/Form/ProductEditForm';
import ConfirmButton from '../../components/ConfirmButton';
import Table from '../../components/Table';

export default function ProductPage() {
  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'images',
        Cell: ({ value }) => <Image width="60px" src={value[0]} />,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
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
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Category',
        accessor: 'category.name',
      },
      {
        Header: 'Author',
        accessor: 'authors',
        Cell: ({ value }) => {
          return value.map(item => item.name).join(', ');
        },
      },
      {
        Header: 'Action',
        id: 'expander',
        Cell: ({ value, row }) => {
          return (
            <HStack>
              <Button
                {...row.getToggleRowExpandedProps()}
                size="sm"
                as="span"
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
        price: 1234,
        discount: 0.3,
        category: {
          name: 'ABC',
        },
        images: [
          'https://res.cloudinary.com/dqwgxcnh7/image/upload/v1607339103/store/mhnt25j8ll0xhy48lyfs.jpg',
        ],
        authors: [{ name: 'abc' }, { name: 'xyz' }],
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({row}) => (<ProductEditForm />),
    []
  );

  return (
    <BlockLayout blockName="Product Table">
      <Table
        columns={columns}
        showPagination={true}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </BlockLayout>
  );
}
