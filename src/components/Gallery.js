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
import { request } from '../graphqlClient';
import ConfirmButton from '../components/ConfirmButton';

function Item({ public_id, secure_url, onChange, isDisabled }) {
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
      <Checkbox
        onChange={handleChange}
        colorScheme="green"
        isDisabled={isDisabled}
      ></Checkbox>
    </VStack>
  );
}

export default function Gallery({ dialog, onInsert, multiple = true }) {
  const [images, setImages] = useState([]);
  const [ids, setIds] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState('');
  const input = useRef(null);

  async function handleUpload(e) {
    const query = `
      mutation($files: [Upload!]) {
        uploadImages(files: $files) {
          public_id
        }
      }
    `;

    try {
      const result = await request(query, {
        files: Array.from(e.target.files),
      });

      await fetchImages(true);
      setError(null);
    } catch (error) {
      setError('Upload Error');
    } finally {
      input.current.value = '';
    }
  }

  async function handleDelete() {
    if (ids.length === 0) return;

    const query = `
      mutation($public_ids: [String!]) {
        removeImages(public_ids: $public_ids)
      }
    `;

    try {
      const result = await request(query, {
        public_ids: ids.map(item => item.public_id),
      });
      setIds([]);
      setError(null);
      await fetchImages(true);
    } catch (error) {
      setError('Delete Error');
    }
  }

  async function fetchImages(reset) {
    const query = `
      query {
        getImages {
          list {
            secure_url
            public_id
          }
        }
      }
    `;
    const {
      getImages: { list, next_cursor },
    } = await request(query);

    setCursor(next_cursor);
    if (reset) {
      setImages([...list]);
    } else {
      setImages([...list, ...images]);
    }
  }

  function handleSelect(isAdd, img) {
    if (isAdd) {
      if (multiple) {
        setIds([img, ...ids]);
      } else {
        setIds([img]);
      }
    } else {
      setIds(ids.filter(item => item.public_id !== img.public_id));
    }
  }

  function handleInsert() {
    if (!multiple) {
      if (ids.length > 1) {
        alert('Only 1');
        return;
      }
    }
    onInsert(ids);
  }

  useEffect(() => {
    fetchImages(true);
  }, []);

  return (
    <Box>
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
          <Button colorScheme="blue" onClick={handleInsert}>
            Insert
          </Button>
        )}
        <ConfirmButton
          colorScheme="red"
          buttonText="Delete"
          onAccept={handleDelete}
        />
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
    </Box>
  );
}
