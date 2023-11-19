import { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchbarHeader, Form, Button, Input } from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

const  handleQueryChange = e => {
  setSearchQuery(e.target.value);
  };

const handleSubmit = e => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }
    onSubmit(searchQuery);
    reset();
  };

const reset = () => {
  setSearchQuery('');
}
    return (
      <SearchbarHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
        </Form>
      </SearchbarHeader>
    );
  }

