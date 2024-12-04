import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL: baseURL }), options);
  return instance;
}

// export const canvases = create(
//   'https://json-server-vercel-sage-alpha.vercel.app/canvases/',
// );
export const canvases = create(
  `${import.meta.env.VITE_API_BASE_URL}/canvases/`,
);
// export const posts = create('http://localhost:8000/posts/');
//instance.get("/");
//instance.post("/"); 등록 요청