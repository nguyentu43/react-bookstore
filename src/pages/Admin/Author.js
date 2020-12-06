import { useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import {
  Avatar,
  Button,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';
import GalleryModal from '../../components/Admin/GalleryModal';

export default function Author() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dataAvatar, setDataAvatar] = useState(null);

  function openModal(data) {
    onOpen();
    setDataAvatar(data);
    console.log(data);
  }

  function onInsert(ids) {
    if (ids.length === 1) {
      console.log(ids);
      console.log(dataAvatar);
      setDataAvatar(null);
    }
    onClose();
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: data => {
          return <Avatar onClick={() => openModal(data)} />;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: data => {
          const NameInput = customInput(Input, data, ['required']);
          return <NameInput />;
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        id: 'description',
        Cell: data => {
          const DescInput = customInput(Textarea, data);
          return <DescInput />;
        },
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value }) => (
          <ConfirmButton size="sm" colorScheme="red" buttonText="Delete" />
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: 'ABC',
        icon: 'FcAlarmClock',
        id: '1',
        description: 'This is author',
      },
      {
        name: 'ABFC',
        icon: 'FcAlarmClock',
        id: '2',
        description: 'This is author',
      },
    ],
    []
  );

  return (
    <BlockLayout blockName="Author Table">
      <Table columns={columns} data={data} />
      <GalleryModal isOpen={isOpen} onClose={onClose} onInsert={onInsert} />
    </BlockLayout>
  );
}
