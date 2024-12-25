interface Config {
  baseUrl: string;
  port: string | undefined;
  url: string | undefined;
}

const getBaseUrl = (): string => {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
  let baseUrl = "";

  if (NEXT_PUBLIC_URL === "localhost") {
    const port = process.env.NEXT_PUBLIC_PORT;
    baseUrl = `http://${NEXT_PUBLIC_URL}:${port}`;
  }

  return baseUrl;
};

export const config: Config = {
  baseUrl: getBaseUrl(),
  port: process.env.NEXT_PUBLIC_PORT,
  url: process.env.NEXT_PUBLIC_URL,
};
