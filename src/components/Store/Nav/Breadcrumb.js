import {
  Box,
  Breadcrumb as Container,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

export default function Breadcrumb() {
  return (
    <Box px={[4, 6, 12]} py={6} borderBottomWidth={1}>
    <Container>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
      </BreadcrumbItem>
    </Container></Box>
  );
}
