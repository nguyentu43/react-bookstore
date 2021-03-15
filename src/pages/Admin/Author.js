import { useCallback, useEffect, useMemo, useState } from 'react';
import BlockLayout from '../../components/Admin/BlockLayout';
import Table from '../../components/Table';
import {
  Avatar,
  Button,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ConfirmButton from '../../components/ConfirmButton';
import customInput from '../../hocs/customInput';
import GalleryModal from '../../components/Admin/GalleryModal';
import { addAuthor, fetchAuthors, removeAuthor, updateAuthor } from '../../api';

export default function Author() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [avatarData, setAvatarData] = useState(null);
  const toast = useToast();

  const openModal = useCallback(
    data => {
      onOpen();
      setAvatarData(data);
    },
    [onOpen]
  );

  function onInsert(ids) {
    if (ids.length === 1) {
      const input = {
        avatar: ids[0].public_id,
        name: avatarData.row.original.name,
        description: avatarData.row.original.description,
      };
      avatarData.save({ id: avatarData.row.original.id, ...input });
      setAvatarData(null);
    }
    onClose();
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: data => {
          return <Avatar src={data.value} onClick={() => openModal(data)} />;
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
        Cell: ({ value, remove }) => (
          <ConfirmButton
            size="sm"
            onAccept={() => remove({ id: value })}
            colorScheme="red"
            buttonText="Delete"
          />
        ),
      },
    ],
    [openModal]
  );

  const [authors, setAuthors] = useState([]);

  const [skipPageReset, setSkipPage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSkipPage(false);
  }, [authors]);

  async function fetchData() {
    try {
      const { authors } = await fetchAuthors();
      setAuthors(authors);
    } catch (error) {
      throw error;
    }
  }

  const action = {
    save: async ({ id, name, avatar, description }) => {
      try {
        setSkipPage(true);
        await updateAuthor({ id, input: { name, avatar, description } });
        toast({ status: 'info', title: 'Author has been updated' });
        fetchData();
      } catch (error) {
        throw error;
      }
    },
    remove: async ({ id }) => {
      try {
        setSkipPage(true);
        await removeAuthor({ id });
        fetchData();
      } catch (error) {
        throw error;
      }
    },
  };

  async function add() {
    try {
      setSkipPage(true);
      await addAuthor({ input: { name: 'New Author' } });
      fetchData();
    } catch (error) {
      throw error;
    }
  }

  return (
    <BlockLayout blockName="Author Table">
      <Button colorScheme="blue" my={2} onClick={add}>
        Add
      </Button>
      <Table
        columns={columns}
        skipPageReset={skipPageReset}
        data={authors}
        action={action}
      />
      <GalleryModal isOpen={isOpen} onClose={onClose} onInsert={onInsert} />
    </BlockLayout>
  );
}
