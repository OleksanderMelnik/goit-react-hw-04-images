import React, { useState, useEffect } from 'react';
import { fetchImage, renderValues } from './api';
import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDiv} from './App.styled';

export function App() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setShowModal] = useState(false);


  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchImage(searchQuery, galleryPage);

        if (totalHits === 0) {
          toast.warn(
            'Sorry, but we have not found anything. Please change your search query.'
          );
        }
        const newImages = renderValues(hits);

        setGalleryItems(prevImages => [...prevImages, ...newImages]);
        setShowModal(galleryPage < Math.ceil(totalHits / 12 ));
        

      } catch (error) {
        setError(error);
        toast.error('Oops!!! Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery || galleryPage > 1) {
      fetchGallery();
    }
  }, [error, searchQuery, galleryPage]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setGalleryItems([]);
    setGalleryPage(1);
  };

  const onLoadMore = () => {
    setGalleryPage(prevPage => prevPage + 1);
  };
    return (
      <AppDiv>
        <Searchbar onSubmit={handleFormSubmit} />
        {error && <h2>Please enter a word to search!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={onLoadMore} />}
        <ToastContainer autoClose={1000} theme="light"/>
      </AppDiv>
    );
  }
