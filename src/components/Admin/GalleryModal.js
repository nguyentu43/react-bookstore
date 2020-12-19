import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Gallery from '../Gallery';

export default function GalleryModal({ onInsert, multiple = false, ...rest }) {
  return (
    <Modal {...rest} size="xl">
      <ModalOverlay />
      <ModalContent maxH={500} overflowY="auto">
        <ModalHeader>Insert Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Gallery dialog={true} multiple={multiple} onInsert={onInsert} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
