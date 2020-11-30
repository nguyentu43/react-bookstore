import Slider from 'react-slick';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CarouselWrapper({ children, ...rest }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Icon w={8} h={8} as={FaChevronLeft} />,
    nextArrow: <Icon w={8} h={8} as={FaChevronRight} />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false
        }
      }
    ],
    ...rest,
  };

  return (
    <Slider
      {...settings}
    >
      {children}
    </Slider>
  );
}
