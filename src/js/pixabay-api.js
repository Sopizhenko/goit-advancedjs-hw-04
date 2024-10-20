const API_KEY = '14089445-7a335211e96dbf178fafb69e6';

function searchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const url = new URL('https://pixabay.com/api/');
  url.search = new URLSearchParams(params).toString();

  return fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch images');
        }
        return res.json();
    });
}

export { searchImages };
