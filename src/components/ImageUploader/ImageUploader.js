import { Stack, Input, Button, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

import ImageCard from './ImageCard';

function ImageUploader() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    console.log(e.target.files);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    setLoading(true);
    axios
      .post('/gallery', formData)
      .then((res) => setImages((prev) => [...prev, res.data.url]))
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }

  return (
    <Stack>
      <form onSubmit={handleFormSubmit}>
        <Stack direction="row" position="relative">
          <Button
            as="label"
            htmlFor="falleryFileUpload"
            cursor="pointer"
            variant="outline"
          >
            Select image
          </Button>
          <Input
            type="file"
            accept="image/*"
            name="image"
            required
            onChange={handleFileChange}
            id="falleryFileUpload"
            position="absolute"
            left="50px"
            bottom="0"
            white-space="nowrap"
            width="1px"
            height="1px"
            overflow="hidden"
            border="0"
            padding="0"
            clip="rect(0 0 0 0)"
            clipPath="inset(50%)"
            margin="-1px"
          />
          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            loadingText="Uploading..."
            colorScheme="blue"
          >
            Upload
          </Button>
        </Stack>
      </form>

      <Grid templateColumns="repeat(6, 1fr)" gap="12px">
        {images.map((imageUrl) => (
          <GridItem key={imageUrl}>
            <ImageCard imageUrl={imageUrl} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}

export default ImageUploader;
