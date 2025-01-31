import { useState } from 'react';
import { useUpdateAvatarMutation } from '../services/api';

export const useAvatarUpload = (userId: string) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [updateAvatar] = useUpdateAvatarMutation();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validFileTypes = ['image/jpeg', 'image/png'];
    if (!validFileTypes.includes(file.type)) {
      setErrorMsg('Solo se permiten archivos JPG o PNG.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('El archivo debe ser menor a 5MB.');
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setErrorMsg(null);
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setErrorMsg(null);
    
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      await updateAvatar({ userId, formData }).unwrap();
    } catch (error) {
      setErrorMsg('No se pudo guardar la imagen. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedImage,
    previewImage,
    errorMsg,
    isLoading,
    handleImageChange,
    handleSaveImage,
  };
};
