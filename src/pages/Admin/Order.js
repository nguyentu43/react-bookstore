/* eslint-disable react-hooks/exhaustive-deps */
import { Button, HStack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import BlockLayout from '../../components/Admin/BlockLayout';
import ConfirmButton from '../../components/ConfirmButton';
import Table from '../../components/Table';
import OrderEditForm from '../../components/Admin/Form/OrderEditForm';
import {
  addOrder,
  fetchOrders,
  fetchProducts,
  fetchUsers,
  removeOrder,
  updateOrder,
} from '../../api';
import moment from 'moment';

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
            decimalScale={2}
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
        Header: 'Order Date',
        accessor: 'createdAt',
        Cell: ({ value }) => moment(Number(value)).fromNow(),
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value, row, remove }) => {
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
              <ConfirmButton
                onAccept={() => remove(value)}
                buttonText="Delete"
                colorScheme="red"
                size="sm"
              />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [skipPageReset, setSkipPage] = useState(false);

  async function fetchData() {
    try {
      const { orders } = await fetchOrders();
      setOrders(orders);
      const { products } = await fetchProducts();
      setProducts(products);
      const { users } = await fetchUsers();
      setUsers(users);
    } catch (error) {
      throw error;
    }
  }

  async function save(data) {
    try {
      setSkipPage(true);
      await updateOrder(data);
      fetchData();
    } catch (error) {
      throw error;
    }
  }

  async function add() {
    try {
      setSkipPage(true);
      await addOrder({
        input: {
          name: 'Custom Name',
          status: 'created',
          phone: '123456',
          total: 0,
          items: [],
          address: 'USA',
        },
      });
      fetchData();
    } catch (error) {
      throw error;
    }
  }

  async function remove(id) {
    try {
      setSkipPage(true);
      await removeOrder({ id });
      fetchData();
    } catch (error) {
      throw error;
    }
  }

  const renderRowSubComponent = useCallback(
    ({ row: { original } }) => {
      const userOptions = users.map(user => ({
        value: user.id,
        label: user.email,
      }));
      const productOptions = products.map(product => ({
        value: product,
        label: product.name,
      }));
      const statusOptions = [
        {
          value: 'created',
          label: 'created',
        },
        {
          value: 'charged',
          label: 'charged',
        },
      ];

      original.user = original.user || {};

      return (
        <OrderEditForm
          order={{
            ...original,
            user: { value: original.user.id, label: original.user.email },
            status: { label: original.status, name: original.status },
          }}
          save={save}
          userOptions={userOptions}
          productOptions={productOptions}
          statusOptions={statusOptions}
        />
      );
    },
    [users, products]
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSkipPage(false);
  }, [products]);

  return (
    <BlockLayout blockName="Order Table">
      <Button colorScheme="blue" my={2} onClick={add}>
        Add
      </Button>
      <Table
        columns={columns}
        renderRowSubComponent={renderRowSubComponent}
        data={orders}
        skipPageReset={skipPageReset}
        action={{ remove }}
      />
    </BlockLayout>
  );
}
