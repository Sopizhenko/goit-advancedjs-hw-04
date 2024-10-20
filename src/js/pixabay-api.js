import axios from "axios";

const API_KEY = '14089445-7a335211e96dbf178fafb69e6';

async function searchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, {
      params: params
    });

    return response.data;
  } catch (error) {
    console.error('Error creating URL: ', error);
    return [];
  }
}

export { searchImages };
