import { Image, Stack } from "react-bootstrap";
import { images } from "../utils/images";

function ImagesGallery({
  onClick,
  currentImage,
}: {
  onClick: (image: string) => void;
  currentImage: string;
}) {
  return (
    <Stack className="d-flex flex-wrap flex-row " gap={2}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          role="button"
          width={130}
          height={130}
          onClick={() => onClick(image)}
          className={`border ${
            currentImage === image ? ` border-2 border-primary` : `border`
          } `}
        />
      ))}
    </Stack>
  );
}

export default ImagesGallery;
