import initialScreenImage from './../../assets/Main_screen_img_bg.svg';

export const PersonAppImage = () => {
  return (
    <img
      src={initialScreenImage}
      alt="Initial screen"
      style={{
        borderRadius: '5%',
      }}
    />
  );
};
