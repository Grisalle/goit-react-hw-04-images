import { useState } from 'react';
import { Notify } from 'notiflix';

export const SearchBar = ({ handlerSubmit }) => {
  const [value, setValue] = useState('');
  const [lastRequest, setLastRequest] = useState('');

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return Notify.failure('Please, write something');
    } else if (value.toLowerCase().trim() === lastRequest) {
      return Notify.failure('This is current request');
    }
    handlerSubmit(value.toLowerCase().trim());
    setLastRequest(value.toLowerCase().trim());
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          className="SearchForm-input"
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
        />
      </form>
    </header>
  );
};
