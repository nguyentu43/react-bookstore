import {
  Box,
  Breadcrumb as Container,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ category }) {
  const categories = [];

  function recursiveCategory(category) {
    categories.unshift(category);
    if (category.parent) {
      recursiveCategory(category.parent);
    }
  }

  recursiveCategory(category);

  return (
    <Box px={[4, 6, 12]} py={6} borderBottomWidth={1}>
      <Container>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/store">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {categories.map((category, i) => (
          <BreadcrumbItem key={category.id}>
            <BreadcrumbLink
              as={Link}
              to={'/store/search?category=' + category.id}
              isCurrentPage={i === categories.length - 1}
            >
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Container>
    </Box>
  );
}
