import {
  HStack,
  Input,
  Button,
  Select,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  FormLabel,
  Box,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';

import { urls } from '../../constants/urls';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TagFilterItem from './TagFilterItem';

function Searchbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('descending');
  const [allTags, setAllTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsQuery, setTagsQuery] = useState('');
  const [tagsInclude, setTagsInclude] = useState([]);
  const [tagsExclude, setTagsExclude] = useState([]);

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

  useEffect(() => {
    setTagsLoading(true);

    axios
      .get('/tags', {
        params: {
          search: tagsQuery,
        },
      })
      .then((res) => setAllTags(res.data.tags))
      .finally(() => setTagsLoading(false));
  }, [tagsQuery]);

  function handleSubmit(e) {
    e.preventDefault();

    onSearch({
      search: searchQuery,
      tagsInclude,
      tagsExclude,
      sortBy,
      sortOrder,
    });
  }

  function handleTagFilterClick(tagId, value) {
    console.log(tagId, value);

    switch (value) {
      case 0:
        setTagsInclude((prev) => prev.filter((id) => id !== tagId));
        setTagsExclude((prev) => prev.filter((id) => id !== tagId));
        break;
      
      case 1:
        setTagsExclude((prev) => prev.filter((id) => id !== tagId));
        setTagsInclude((prev) => [...prev, tagId]);
        break;
      
      case 2:
        setTagsInclude((prev) => prev.filter((id) => id !== tagId));
        setTagsExclude((prev) => [...prev, tagId]);
        break;
    
      default:
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack>
        <HStack>
          <Input
            type="search"
            autoComplete="off"
            name="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
          />
          <Button type="submit" colorScheme="blue">
            Search
          </Button>
        </HStack>

        <HStack alignItems="end">
          <FormControl flexBasis="100px">
            <FormLabel>Sort by</FormLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">Date</option>
              <option value="usersLiked">Likes</option>
              <option value="views">Views</option>
            </Select>
          </FormControl>

          <FormControl flexBasis="150px">
            <FormLabel>Sort order</FormLabel>
            <Select value={sortOrder} onChange={(e) => setSortOrder(+e.target.value)}>
              <option value={-1}>Descending</option>
              <option value={1}>Ascending</option>
            </Select>
          </FormControl>

          <Menu>
            <MenuButton as={Button}>Filter tags <ChevronDownIcon /></MenuButton>
            <MenuList zIndex={99}>
              <Stack paddingX="2">
                <Box>
                  <Input
                    placeholder="Search"
                    value={tagsQuery}
                    onChange={(e) => setTagsQuery(e.target.value)}
                  />
                </Box>

                <Stack>
                  {allTags.map((tag) => {
                    let value = 0;
                    if (tagsInclude.includes(tag._id)) {
                      value = 1;
                    } else if (tagsExclude.includes(tag._id)) {
                      value = 2;
                    }

                    return <TagFilterItem key={tag._id} id={tag._id} name={tag.name} value={value} onClick={handleTagFilterClick} />
                  })}
                </Stack>
              </Stack>
            </MenuList>
          </Menu>

          {/* <Select
            onChange={(e) =>
              setTagsInclude((prev) => {
                const existingTag = prev.find(
                  (tagId) => tagId === e.target.value
                );
                if (existingTag) {
                  return prev.filter((tagId) => tagId !== e.target.value);
                } else {
                  return [...prev, e.target.value];
                }
              })
            }
          >
            {allTags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </Select> */}
        </HStack>
      </Stack>
    </form>
  );
}

export default Searchbar;
