import {
  HStack,
  VStack,
  Input,
  IconButton,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FaRegTrashAlt } from 'react-icons/fa';
import Select from 'react-select';
import ShortedProduct from '../../components/Store/ShortedProduct';

export default function ProductPicker({
  items = [],
  onChange,
  productOptions,
}) {
  const [value] = useState(null);

  function handleSelect({ value }) {
    const findItem = items.find(i => i.id === value.id);
    if (findItem) {
      findItem.quantity++;
      onChange([...items]);
    } else {
      onChange([...items, { quantity: 1, ...value }]);
    }
  }

  function handleDelete(deleteItem) {
    onChange(items.filter(item => item.id !== deleteItem.id));
  }

  function handleChange(e, updateItem) {
    const item = items.find(i => i.id === updateItem.id);
    const quantity = Number(e.target.value);
    item.quantity = quantity < 1 ? 1 : quantity;
    onChange([...items]);
  }

  const total = useMemo(
    () =>
      items.reduce(
        (prev, item) => prev + item.price * (1 - item.discount) * item.quantity,
        0
      ),
    [items]
  );

  return (
    <VStack align="stretch" borderWidth={1} borderRadius="md" p={2}>
      <Select value={value} onChange={handleSelect} options={productOptions} />
      {items.map((item, i) => (
        <HStack key={i} justify="space-between">
          <ShortedProduct {...item} />
          <Input
            type="number"
            size="sm"
            w={100}
            value={item.quantity}
            onChange={e => handleChange(e, item)}
          />
          <IconButton
            icon={<Icon as={FaRegTrashAlt} />}
            size="sm"
            onClick={() => handleDelete(item)}
          />
        </HStack>
      ))}
      <Heading>
        {'Total: '}
        <CurrencyFormat
          value={total}
          displayType={'text'}
          decimalScale={2}
          thousandSeparator={true}
          prefix={'$'}
        />
      </Heading>
    </VStack>
  );
}
