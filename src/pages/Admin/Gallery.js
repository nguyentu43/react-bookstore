import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';

function Item({ public_id, secure_url, onChange }) {
  function handleChange(e) {
    if (e.target.checked === true) {
      onChange(true, { public_id, secure_url });
    } else {
      onChange(false, { public_id });
    }
  }

  return (
    <VStack p={4} borderWidth={1} borderRadius="md">
      <Image objectFit="contain" h={150} src={secure_url} />
      <Checkbox onChange={handleChange} colorScheme="green"></Checkbox>
    </VStack>
  );
}

export default function Gallery({ dialog, onSelect }) {
  const [images, setImages] = useState([]);
  const [ids, setIds] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState('');
  const input = useRef(null);

  async function handleUpload(e) {
    const formData = new FormData();
    for (const file of Array.from(e.target.files)) {
      formData.append('gallery', file);
    }

    const res = await fetch('http://localhost/storages/upload', {
      method: 'post',
      body: formData,
    });
    const result = await res.json();
    if (res.status !== 200) {
      setError(result.error);
    } else {
      await fetchImages(true);
      setError(null);
      input.current.value = '';
    }
  }

  async function handleDelete() {
    if (ids.length === 0) return;

    const res = await fetch('http://localhost/storages/delete', {
      method: 'post',
      body: JSON.stringify({ public_ids: ids }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (res.status !== 200) {
      setError(result.error);
    } else {
      setIds([]);
      setError(null);
      await fetchImages(true);
    }
  }

  async function fetchImages(reset) {
    const res = await fetch(
      'http://localhost/storages' + (cursor ? '?next_cursor=' + cursor : '')
    );
    const result = await res.json();
    if(res.status === 200){
      setCursor(result.next_cursor);
      if (reset) {
        setImages([...result.resources]);
      } else {
        setImages([...result.resources, ...images]);
      }
    }
    else{
      setError(result.error);
    }
  }

  function handleSelect(isAdd, img) {
    if (isAdd) {
      setIds([img, ...ids]);
    } else {
      setIds(ids.filter(item => item.public_id !== img.public_id));
    }
  }

  useEffect(() => {
    fetchImages(true);
  }, []);

  return (
    <BlockLayout blockName="Gallery">
      <input
        type="file"
        id="gallery"
        multiple
        ref={input}
        onChange={handleUpload}
      />

      {error && (
        <Box mt={4} textColor="red.500">
          {error}
        </Box>
      )}

      <HStack mt={4}>
        {dialog && (
          <Button colorScheme="blue" onClick={onSelect}>
            Insert
          </Button>
        )}
        <Button colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </HStack>

      <SimpleGrid
        columns={dialog ? [1, 1, 2] : [1, 2, 3, 4]}
        gap={4}
        mt={4}
        alignItems="center"
      >
        {images.map(image => (
          <Item onChange={handleSelect} key={image.public_id} {...image} />
        ))}
        {cursor && <Button onClick={() => fetchImages()}>Show more</Button>}
      </SimpleGrid>
    </BlockLayout>
  );
}
