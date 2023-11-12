import { useState, useEffect } from 'react';
import { fetchImage } from './api/pixabay';
import { Button } from './Button/Button';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedIMG, setSelectedIMG] = useState(false);

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      fetchImage(searchText, currentPage)
        .then(resp => {
          if (!resp.ok) {
            setError('Sorry, something not good');
            throw new Error();
          }
          return resp.json();
        })
        .then(data => {
          if (data.totalHits === 0) {
            setError('Sorry, nothing');
            throw new Error();
          } else {
            setItems(prevItems => [...prevItems, ...data.hits]);
            setTotalHits(data.totalHits);
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchText, currentPage]);

  const handlerCloseModal = () => {
    setIsShowModal(false);
  };

  const handlerImageClick = ({
    target: {
      dataset: { original },
    },
  }) => {
    setSelectedIMG(original);
    setIsShowModal(true);
  };

  const handlerLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handlerSubmit = value => {
    setSearchText(value);
    setCurrentPage(1);
    setItems([]);
    setError('');
  };

  return (
    <div className="App">
      <SearchBar handlerSubmit={handlerSubmit} />
      {isShowModal && (
        <Modal
          handlerCloseModal={handlerCloseModal}
          selectedIMG={selectedIMG}
        />
      )}
      {items.length > 0 && (
        <ImageGalery items={items} handlerImageClick={handlerImageClick} />
      )}
      {isLoading && <Loader />}
      {items.length < totalHits && !error && !isLoading && (
        <Button handlerLoadMore={handlerLoadMore} />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
