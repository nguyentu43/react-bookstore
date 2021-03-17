/* eslint-disable react-hooks/exhaustive-deps */
import { Button, HStack, Image, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import {
  addProduct,
  fetchAuthors,
  fetchCategories,
  fetchProducts,
  removeProduct,
  updateProduct,
} from '../../api';
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
        Cell: ({ value }) => <Image width="60px" src={value[0].secure_url} />,
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
        accessor: 'id',
        id: 'expander',
        Cell: ({ value, row, remove }) => {
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
              <ConfirmButton
                onAccept={() => remove({ id: value })}
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

  const [products, setProducts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skipPageReset, setSkipPage] = useState(false);
  const toast = useToast();

  async function add() {
    try {
      setSkipPage(true);
      const input = {
        name: 'New book',
        images: JSON.stringify(['store/200x300_rffsze']),
        price: 1,
        category: '1',
        authors: ['1'],
      };

      await addProduct({
        input,
      });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  async function save({ id, input }) {
    try {
      setSkipPage(true);
      await updateProduct({ id, input });
      toast({ status: 'info', title: 'Book has been updated' });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  const renderRowSubComponent = useCallback(
    ({ row }) => {
      const product = { ...row.original };
      product.category = {
        value: product.category.id,
        label: product.category.name,
      };
      product.authors = product.authors.map(({ id, name }) => ({
        label: name,
        value: id,
      }));

      return (
        <ProductEditForm
          product={product}
          save={save}
          categoryOptions={categories}
          authorOptions={authors}
        />
      );
    },
    [authors, categories]
  );

  const action = {
    async remove({ id }) {
      try {
        setSkipPage(true);
        await removeProduct({ id });
        fetchData();
        toast({ status: 'info', title: 'Book has been deleted' });
      } catch (error) {
        toast({ status: 'error', title: 'System Error. Try again' });
      }
    },
  };

  async function fetchData() {
    try {
      const { products } = await fetchProducts({ search: 'order=1' });
      const { categories } = await fetchCategories();
      const { authors } = await fetchAuthors();
      setProducts(products);
      setAuthors(
        authors.map(author => ({ value: author.id, label: author.name }))
      );
      setCategories(
        categories.map(category => ({
          value: category.id,
          label: category.name,
        }))
      );
    } catch (error) {
      toast({ status: 'error', title: 'System Error. Try again' });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSkipPage(false);
  }, [products]);

  return (
    <BlockLayout blockName="Product Table">
      <Button colorScheme="blue" my={2} onClick={add}>
        Add
      </Button>
      <Table
        columns={columns}
        data={products}
        renderRowSubComponent={renderRowSubComponent}
        action={action}
        skipPageReset={skipPageReset}
      />
    </BlockLayout>
  );
}
