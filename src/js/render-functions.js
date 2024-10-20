function getGallery(data) {
  // webformatURL — посилання на маленьке зображення для списку карток у галереї
  // largeImageURL — посилання на велике зображення для модального вікна
  // tags — рядок з описом зображення. Підійде для атрибута alt
  // likes — кількість вподобайок
  // views — кількість переглядів
  // comments — кількість коментарів
  // downloads — кількість завантажень

  // Generate the gallery HTML

  const gallery = document.createElement('ul');
  gallery.classList.add('gallery');

  for (const item of data) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');

    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery-image');
    galleryImage.src = item.webformatURL;
    galleryImage.alt = item.tags;

    const link = document.createElement('a');
    link.classList.add('gallery-link');
    link.href = item.largeImageURL;
    link.append(galleryImage);

    galleryItem.append(link);

    const info = document.createElement('div');
    info.classList.add('info');

    const likes = document.createElement('div');
    likes.classList.add('info-details');
    likes.innerHTML = `<span class="info-text">Likes</span>${item.likes}`;

    const views = document.createElement('div');
    views.classList.add('info-details');
    views.innerHTML = `<span class="info-text">Views</span>${item.views}`;

    const comments = document.createElement('div');
    comments.classList.add('info-details');
    comments.innerHTML = `<span class="info-text">Comments</span>${item.comments}`;

    const downloads = document.createElement('div');
    downloads.classList.add('info-details');
    downloads.innerHTML = `<span class="info-text">Downloads</span>${item.downloads}`;

    info.append(likes, views, comments, downloads);
    galleryItem.append(info);
    gallery.append(galleryItem);
  }
  return gallery.innerHTML;
}

export { getGallery };
