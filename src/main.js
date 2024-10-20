import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { getGallery } from './js/render-functions';

iziToast.settings({
  position: 'topRight',
});

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  className: 'gallery-wrapper',
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = form.elements.q.value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search query',
    });
    form.reset();
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  searchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        gallery.innerHTML = getGallery(data.hits);
        lightbox.refresh();
      }
    })
    .catch(err => {
      iziToast.error({
        message: err.message,
      });
    })
    .finally(() => {
      form.reset();
      loader.classList.add('is-hidden');
    });
});
