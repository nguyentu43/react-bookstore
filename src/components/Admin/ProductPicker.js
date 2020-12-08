import { HStack, VStack, Input, IconButton, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Select from 'react-select';
import ShortedProduct from '../../components/Store/ShortedProduct';

export default function ProductPicker({ items = [], onChange }) {
  const [value, setValue] = useState(null);

  const products = [
    { value: 1, label: 'Book 1' },
    { value: 2, label: 'Book 2' },
    { value: 3, label: 'Book 3' },
    { value: 4, label: 'Book 4' },
  ];

  function handleSelect({value: id}){
    const findItem = items.find(i => i.id === id);
    if(findItem){
        findItem.quantity++;
        onChange([...items]);
    }
    else{
        onChange([...items, {quantity: 1, id}]);
    }
  }

  function handleDelete(deleteItem){
    onChange(items.filter(item => item.id !== deleteItem.id));
  }

  function handleChange(e, updateItem){
    const item = items.find(i => i.id === updateItem.id);
    item.quantity = Number(e.target.value);
    onChange([...items]);
  }

  return (
    <VStack align="stretch" borderWidth={1} borderRadius="md" p={2}>
      <Select value={value} onChange={handleSelect} options={products} />
      {items.map((item, i) => (
        <HStack key={i}>
          <ShortedProduct />
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleChange(e, item )}
            min={1}
          />
          <IconButton icon={<Icon as={FaRegTrashAlt}/>} size="sm" onClick={() => handleDelete(item)} />
        </HStack>
      ))}
    </VStack>
  );
}
