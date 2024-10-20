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
const loadMoreBtn = document.querySelector('.load-more');

let page;

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

  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  search(query);
});

loadMoreBtn.addEventListener('click', () => {
  const query = form.elements.q.value.trim();

  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  search(query);

  setTimeout(() => {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const galleryItemHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: galleryItemHeight * 2,
        behavior: 'smooth',
      });
    }
  }, 500);
});

function search(query) {
  searchImages(query, page)
    .then(data => {
      const isLastPage = page >= Math.ceil(data.totalHits / 15);

      if (data.hits.length === 0) {
        iziToast.warning({
          message: 'No more images found',
        });
        return;
      } else {
        page += 1;
        gallery.insertAdjacentHTML('beforeend', getGallery(data.hits));
        lightbox.refresh();
      }

      if (isLastPage) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreBtn.classList.add('is-hidden');
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(err => {
      iziToast.error({
        message: err.message,
      });
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}
