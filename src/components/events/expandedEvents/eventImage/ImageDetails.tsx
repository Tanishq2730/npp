'use client';

import { Modal, Image } from '@mantine/core';

interface ImagePopupProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  imgUrl: string;
}

const ImageDetails: React.FC<ImagePopupProps> = ({
  isOpen,
  setIsOpen,
  title,
  // description,
  imgUrl,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      size="lg"
      centered
    >
      {/* Modal Content */}
      <div style={{ textAlign: 'center' }}>
        <Image
          src={imgUrl}
          alt={title}

          radius="md"
          mb="md"
        />
       
      </div>
    </Modal>
  );
};

export default ImageDetails;
