import BlockLayout from '../BlockLayout';
import CarouselWrapper from '../Wrapper/CarouselWrapper';
import Product from '../Product';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api';

export default function BestSellingBlock() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { products } = await fetchProducts({
        search: 'order=0',
        limit: 10,
      });
      setProducts(products);
    }
    fetchData();
  }, []);

  return (
    <BlockLayout
      blockName="BestSelling Books"
      rightButtonName="View All"
      to="/store/search?order=0"
    >
      <CarouselWrapper slidesToShow={5} dots={false} arrows={true}>
        {products.map(item => (
          <Product inSlider={true} {...item} key={item.id} />
        ))}
      </CarouselWrapper>
    </BlockLayout>
  );
}
