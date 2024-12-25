export const getBaseUrl = () => {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

  let baseUrl = '';
  if (NEXT_PUBLIC_URL === 'localhost') {
    const port = process.env.NEXT_PUBLIC_PORT;
    baseUrl = `http://${NEXT_PUBLIC_URL}:${port}`;
  }

  return baseUrl;
};
