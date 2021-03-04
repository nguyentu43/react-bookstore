import { Box, Heading, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import React from 'react';
import { useExpanded, usePagination, useTable } from 'react-table';

export default function Table({
  columns,
  data,
  action,
  skipPageReset,
  renderRowSubComponent,
  ...rest
}) {
  const {
    getTableProps,
    getTableBodyProps,
    visibleColumns,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      ...action,
    },
    useExpanded,
    usePagination
  );

  return (
    <>
      <Box overflowX="auto" borderRadius="md" borderWidth={1}>
        <Box w="full" as="table" {...rest} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, hgI) => (
              <TRow key={hgI} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, hcI) => (
                  <THeading key={hcI} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </THeading>
                ))}
              </TRow>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length === 0 && <TRow><TData>Don't have any data to show</TData></TRow>}
            {page.map((row, rI) => {
              prepareRow(row);
              return (
                <React.Fragment key={rI}>
                  <TRow {...row.getRowProps()}>
                    {row.cells.map((cell, cI) => {
                      return (
                        <TData key={cI} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TData>
                      );
                    })}
                  </TRow>
                  {row.isExpanded && (
                    <TRow>
                      <TData colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </TData>
                    </TRow>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </Box>
      </Box>
      <HStack my={4}>
        <IconButton
          colorScheme="blue"
          size="sm"
          disabled={!canPreviousPage}
          icon={<Icon as={FaAngleDoubleLeft} />}
          onClick={() => gotoPage(0)}
        />
        <IconButton
          colorScheme="blue"
          size="sm"
          disabled={!canPreviousPage}
          icon={<Icon as={FaAngleLeft} />}
          onClick={() => previousPage()}
        />
        <IconButton
          colorScheme="blue"
          size="sm"
          disabled={!canNextPage}
          icon={<Icon as={FaAngleRight} />}
          onClick={() => nextPage()}
        />
        <IconButton
          colorScheme="blue"
          size="sm"
          disabled={!canNextPage}
          icon={<Icon as={FaAngleDoubleRight} />}
          onClick={() => gotoPage(pageCount - 1)}
        />
      </HStack>
    </>
  );
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
    <Box as="tr" {...rest}>
      {children}
    </Box>
  );
}
