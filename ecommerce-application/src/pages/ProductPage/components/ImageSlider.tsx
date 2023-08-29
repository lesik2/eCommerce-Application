import React from 'react';
import { IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Placeholder from '../../../assets/img/product_placeholder.png';

type ImageSliderProps = {
    images?: string[];
    productName?: string;
};

function ImageSlider({ images = [Placeholder], productName = 'photo placeholder' }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

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
                    className="sm:w-2"
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
                className="mx-3 object-top w-1/2 aspect-w-1 transition-transform origin-bottom"
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
        </div>
    );
}

export default ImageSlider;

ImageSlider.defaultProps = {
    images: [Placeholder],
    productName: 'photo placeholder',
};
