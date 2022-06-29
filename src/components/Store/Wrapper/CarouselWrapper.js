import Slider from 'react-slick';
import { Icon, SimpleGrid } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import React from 'react';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <Icon
    w={8}
    h={8}
    as={FaChevronLeft}
    {...props}
    className={
      'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
    }
    _hover={{ color: 'black' }}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
  />
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <Icon
    w={8}
    h={8}
    as={FaChevronRight}
    {...props}
    className={
      'slick-next slick-arrow' +
      (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
    _hover={{ color: 'black' }}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
  />
);

export default function CarouselWrapper({ children, ...rest }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
    ...rest,
  };

  const childrenCount = React.Children.count(children);

  if (childrenCount < settings.slidesToShow) {
    return <SimpleGrid columns={[1, 2, 3, 5]}>{children}</SimpleGrid>;
  }

  return <Slider {...settings}>{children}</Slider>;
}
