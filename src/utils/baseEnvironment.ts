export const getApiImageUrl = ((itemUrl: string) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    return itemUrl?.startsWith('http') ? itemUrl : `${baseUrl}${itemUrl}`;
  });

  