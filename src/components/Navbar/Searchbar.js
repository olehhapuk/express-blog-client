import { HStack, Input, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { urls } from '../../constants/urls';

function Searchbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== urls.search) {
      setSearchQuery('');
    } else {
      const searchParams = qs.parse(location.search);
      setSearchQuery(searchParams.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <HStack as="form" maxW="320px" onSubmit={handleSubmit}>
      <Input
        type="search"
        autoComplete="off"
        name="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        required
      />
      <Button type="submit" colorScheme="blue">
        Search
      </Button>
    </HStack>
  );
}

export default Searchbar;
