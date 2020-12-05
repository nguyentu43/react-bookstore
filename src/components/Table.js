import { Box, Heading, Text } from '@chakra-ui/react';
import { usePagination, useTable } from 'react-table';

export default function Table({ columns, data, action, skipPageReset, ...rest }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      ...action,
    },
    usePagination
  );

  return <Box overflowX="auto" borderRadius="md" borderWidth={1}>
    <Box w="full" as="table" {...rest} { ...getTableProps() }>
        <thead>
          {
            headerGroups.map(headerGroup => (<TRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (<THeading { ...column.getHeaderProps() }>{column.render("Header")}</THeading>))}
            </TRow>))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
           {page.map((row, i) => {
             prepareRow(row);
             return (
               <TRow {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return <TData {...cell.getCellProps()}>{cell.render("Cell")}</TData>
                 })}
               </TRow>
             )
           })}
        </tbody>
        <tfoot>
          
        </tfoot>
      </Box>
  </Box>
}

export function THeading({ children, ...rest }) {
  return (
    <Heading
      as="th"
      borderBottomWidth={3}
      py={4}
      px={2}
      textAlign="left"
      size="md"
      {...rest}
    >
      {children}
    </Heading>
  );
}

export function TData({ children, ...rest }) {
  return (
    <Text as="td" borderBottomWidth={1} px={2} py={4} {...rest}>
      {children}
    </Text>
  );
}

export function TRow({ children, ...rest }) {
  return (
    <Box _even={{ bg: 'gray.50' }} as="tr" {...rest}>
      {children}
    </Box>
  );
}
