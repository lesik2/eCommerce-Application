type ImageProps = {
    className: string;
    image: string;
    alt: string;
};

export default function Image({ className, image, alt }: ImageProps) {
    return (
        <div className={className}>
            <img src={image} alt={alt} className="w-full h-full" />
        </div>
    );
}
