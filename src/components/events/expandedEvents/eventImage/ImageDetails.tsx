'use client';

import { Modal, Image } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImagePopupProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  imgUrl: string;
  images?: string[];
  initialSlide?: number;
}

const ImageDetails: React.FC<ImagePopupProps> = ({
  isOpen,
  setIsOpen,
  title,
  imgUrl,
  images = [],
  initialSlide = 0,
}) => {
  // Use all images including the main imgUrl if images array is provided
  const allImages = images?.length > 0 ? images : [imgUrl];

  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      size="xl"
      centered
    >
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          initialSlide={initialSlide}
          spaceBetween={20}
          slidesPerView={1}
          loop={allImages.length > 1}
          style={{ 
            width: '100%', 
            aspectRatio: '16/9',
            maxHeight: '70vh'
          }}
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000'
              }}>
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  radius="md"
                  fit="contain"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Arrows */}
        <div
          className="swiper-button-prev"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <IconChevronLeft size={24} color="#333" />
        </div>
        <div
          className="swiper-button-next"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <IconChevronRight size={24} color="#333" />
        </div>

        <style>
          {`
            .swiper-button-prev::after,
            .swiper-button-next::after {
              display: none;
            }
            .swiper-button-prev:hover,
            .swiper-button-next:hover {
              background-color: rgba(255, 255, 255, 1) !important;
              transform: translateY(-50%) scale(1.1);
            }
            .swiper-button-disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
            .swiper-pagination-bullet {
              background: rgba(255, 255, 255, 0.8);
            }
            .swiper-pagination-bullet-active {
              background: #fff;
            }
          `}
        </style>
      </div>
    </Modal>
  );
};

export default ImageDetails;
