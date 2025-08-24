export const transferImageToBase64 = (
  image: FileList,
  callback: (string: string) => void
) => {
  const imageBlob = image[0];
  let transformedImage: string;

  const reader = new FileReader();
  reader.onload = () => {
    transformedImage = reader.result as string;
    callback(transformedImage);
  };
  reader.readAsDataURL(imageBlob);
};
