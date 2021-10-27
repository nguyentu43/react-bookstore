import {
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import GalleryModal from './GalleryModal';
import { ReactSortable } from 'react-sortablejs';

export default function ImagePicker({ images = [], onChange }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onInsert(list) {
    const newList = [...images];
    for (const item of list) {
      if (!images.find(image => image.public_id === item.public_id)) {
        newList.push(item);
      }
    }
    onChange(newList);
    onClose();
  }

  function handleRemove(deleteItem) {
    onChange(images.filter(item => item.public_id !== deleteItem.public_id));
  }

  return (
    <>
      <Button mb={4} colorScheme="blue" size="sm" onClick={onOpen}>
        Add Image
      </Button>
      {images.length > 0 && (
        <HStack
          borderWidth={1}
          borderRadius="md"
          p={2}
          wrap="wrap"
          as={ReactSortable}
          list={images}
          setList={onChange}
        >
          {images.map(item => (
            <VStack key={item.public_id} mb={4}>
              <Image loading="lazy" src={item.secure_url} h={40} objectFit="contain" />
              <IconButton
                size="sm"
                colorScheme="red"
                icon={<Icon as={FaRegTrashAlt} />}
                onClick={() => handleRemove(item)}
              />
            </VStack>
          ))}
        </HStack>
      )}
      <GalleryModal
        isOpen={isOpen}
        onInsert={onInsert}
        multiple={true}
        onClose={onClose}
      />
    </>
  );
}
