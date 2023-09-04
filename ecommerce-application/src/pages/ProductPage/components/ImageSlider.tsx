import { useState } from 'react';
import { IconButton, Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Placeholder from '../../../assets/img/product_placeholder.png';

type ImageSliderProps = {
    images?: string[];
    productName?: string;
};

const style = {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',
        sm: 500,
        md: 600,
        lg: 700,
        xl: 800,
    },
    maxWidth: '90vw',
    heigth: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function ImageSlider({ images = [Placeholder], productName = 'photo placeholder' }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="text-center relative flex justify-center items-center">
            {images.length > 1 && (
                <IconButton
                    onClick={goToPrevious}
                    aria-label="Previous"
                    sx={[
                        { '&&': { backgroundColor: 'white' } },
                        { '&:hover': { backgroundColor: '#D9D9D9' } },
                        {
                            '@media (max-width: 550px)': {
                                width: '2rem',
                                height: '2rem',
                            },
                        },
                    ]}
                >
                    <NavigateBeforeIcon />
                </IconButton>
            )}
            <img
                src={images[currentIndex]}
                alt={productName}
                className="mx-3 object-top w-1/2 aspect-w-1 transition-transform origin-bottom cursor-pointer"
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                tabIndex={0}
                onClick={handleOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleOpen();
                    }
                }}
            />
            {images.length > 1 && (
                <IconButton
                    onClick={goToNext}
                    aria-label="Next"
                    sx={[
                        { '&&': { backgroundColor: 'white' } },
                        { '&:hover': { backgroundColor: '#D9D9D9' } },
                        {
                            '@media (max-width: 550px)': {
                                width: '2rem',
                                height: '2rem',
                            },
                        },
                    ]}
                >
                    <NavigateNextIcon />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={false}
            >
                <Box sx={style}>
                    {images.length > 1 && (
                        <IconButton
                            onClick={goToPrevious}
                            aria-label="Previous"
                            sx={[
                                {
                                    '&&': {
                                        backgroundColor: 'white',
                                        borderRadius: '0',
                                        display: 'block',
                                        borderColor: 'none',
                                    },
                                },
                                { '&:hover': { backgroundColor: '#D9D9D9' } },
                            ]}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    )}
                    <img src={images[currentIndex]} alt={productName} className="block" />
                    {images.length > 1 && (
                        <IconButton
                            onClick={goToNext}
                            aria-label="Next"
                            sx={[
                                {
                                    '&&': {
                                        backgroundColor: 'white',
                                        borderRadius: '0',
                                        display: 'block',
                                        borderColor: 'white',
                                    },
                                },
                                { '&:hover': { backgroundColor: '#D9D9D9' } },
                            ]}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    )}
                    <IconButton
                        onClick={handleClose}
                        sx={[
                            {
                                '&&': {
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-50px',
                                    height: '2rem',
                                    width: '2rem',
                                    borderRadius: '50%',
                                    border: 'solid 1px',
                                },
                            },
                            { '&:hover': { backgroundColor: '#D9D9D9' } },
                        ]}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Modal>
        </div>
    );
}

export default ImageSlider;

ImageSlider.defaultProps = {
    images: [Placeholder],
    productName: 'photo placeholder',
};
