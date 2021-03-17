/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { fetchUserOrder } from '../../api';
import BlockLayout from '../../components/Store/BlockLayout';
import Table from '../../components/Table';
import moment from 'moment';
import {
  Icon,
  IconButton,
  UnorderedList,
  SimpleGrid,
  ListItem,
  Box,
  Heading,
} from '@chakra-ui/react';
import { FaRegSmile } from 'react-icons/fa';
import ShortedOrderBlock from '../../components/Store/Block/ShortedOrderBlock';
import withAuth from '../../hocs/withAuth';
import LoadingData from '../../components/LoadingData';

export default withAuth(function Order() {
  const [orders, setOrders] = useState(null);
  const toast = useToast();

  const columns = [
    {
      Header: 'Detail',
      id: 'expanded',
      Cell: ({ row }) => (
        <IconButton
          as="span"
          {...row.getToggleRowExpandedProps()}
          size="sm"
          icon={<Icon as={FaRegSmile} />}
          colorScheme="green"
        />
      ),
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
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Date Order',
      accessor: 'createdAt',
      Cell: ({ value }) => moment(Number(value)).fromNow(),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const { orders } = await fetchUserOrder();
        setOrders(orders);
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    }
    fetchData();
  }, []);

  const renderRowSubComponent = ({ row: { original: order } }) => (
    <>
      <Heading size="xl" mb={4}>
        Order Detail
      </Heading>
      <SimpleGrid columns={[1, 1, 1, 2]} gap={4}>
        <Box px={4} py={2}>
          <UnorderedList>
            <ListItem>Name: {order.name}</ListItem>
            <ListItem>Phone: {order.phone}</ListItem>
            <ListItem>Address: {order.address}</ListItem>
            <ListItem>Status: {order.status}</ListItem>
          </UnorderedList>
        </Box>
        <ShortedOrderBlock total={order.total} items={order.items} />
      </SimpleGrid>
    </>
  );

  if (orders === null) {
    return <LoadingData />;
  }

  return (
    <BlockLayout blockName="Order">
      <Table
        columns={columns}
        data={orders}
        renderRowSubComponent={renderRowSubComponent}
      />
    </BlockLayout>
  );
});
