
interface Iconfig {
  title: string,
  baseUrl: string,
}

const config: Iconfig = {
  title: import.meta.env.VITE_APP_TITLE ? `${import.meta.env.VITE_APP_TITLE}` : '',
  baseUrl: import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}` : '/',
}

export default config;
