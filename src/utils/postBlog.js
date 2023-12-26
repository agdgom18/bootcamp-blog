import axios from 'axios';

async function postBlog(dataForm) {
  const apiUrl = 'https://api.blog.redberryinternship.ge/api/blogs';
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await axios.post(apiUrl, dataForm, axiosConfig);
  return res;
}

export default postBlog;
