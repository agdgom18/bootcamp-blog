import axios from 'axios';

async function fetchFilters(url) {
  const res = await axios.get(`https://api.blog.redberryinternship.ge/api/${url}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });

  console.log(res.data.data);
  return res.data.data;
}

export default fetchFilters;
