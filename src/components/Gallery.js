/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  SimpleGrid,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ConfirmButton from '../components/ConfirmButton';
import { deleteImages, fetchImages, uploadImages } from '../api';

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
  const fileInput = useRef(null);
  const [urls, setUrls] = useState('');

  async function handleUpload() {
    const files = Array.from(fileInput.current.files);
    if(files.length === 0 && urls.trim() == "")
    {
      setError("Please choose files or enter urls");
      return;
    }

    try {
      await uploadImages({
        files,
        urls,
      });
      await fetchData(true);
      setError(null);
      fileInput.current.value = '';
      setUrls('');
    } catch (error) {
      setError('Upload Error: Please check again files or urls');
    }
  }

  async function handleDelete() {
    if (ids.length === 0) return;

    try {
      await deleteImages({
        public_ids: ids.map(item => item.public_id),
      });
      setIds([]);
      setError(null);
      await fetchData(true);
    } catch (error) {
      setError('Delete Error');
    }
  }

  async function fetchData(reset) {
    const {
      getImages: { list, next_cursor },
    } = await fetchImages({ cursor });

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
    onInsert(ids);
  }

  useEffect(() => {
    fetchData(true);
  }, []);

  return (
    <Box>
      <Box>
        <input type="file" id="gallery" multiple ref={fileInput} />
        <Textarea
          placeholder="Enter url images"
          mt={2}
          value={urls}
          onChange={e => setUrls(e.target.value)}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Box>

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
          <Item
            onChange={handleSelect}
            isDisabled={
              !multiple &&
              ids.length === 1 &&
              ids[0].public_id !== image.public_id
            }
            key={image.public_id}
            {...image}
          />
        ))}
        <Button colorScheme="blue" disabled={!cursor} onClick={() => fetchData(false)}>Show More</Button>
      </SimpleGrid>
    </Box>
  );
}
