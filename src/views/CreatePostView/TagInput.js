import {
  FormControl,
  Input,
  Wrap,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  FormHelperText,
  Kbd,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

function TagInput({ selectedTags, setSelectedTags }) {
  const [searchTags, setSearchTags] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value === '') return;

    axios({
      method: 'GET',
      url: '/tags',
      params: {
        search: value,
      },
    }).then((res) => {
      setSearchTags(res.data);
    });
  }, [value]);

  function handleChange(e) {
    const targetValue = e.target.value;
    if (targetValue === ',') return;

    if (targetValue.endsWith(',')) {
      const newTag = targetValue.replace(',', '');
      if (selectedTags.includes(newTag)) {
        return;
      }
      setSelectedTags((prev) => [...prev, newTag]);
      setValue('');
    } else {
      setValue(targetValue);
    }
  }

  function removeTag(tag) {
    setSelectedTags((prev) => prev.filter((tagItem) => tagItem !== tag));
  }

  return (
    <Stack spacing={2}>
      {selectedTags.length > 0 && (
        <Wrap>
          {selectedTags.map((tag) => (
            <Tag key={tag}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
        </Wrap>
      )}

      <FormControl as={Combobox} onSelect={setValue}>
        <ComboboxInput
          as={Input}
          type="text"
          autoComplete="off"
          placeholder="Tags(tag1, tag2)"
          name="tags"
          value={value}
          onChange={handleChange}
        />
        <ComboboxPopover>
          <ComboboxList>
            {searchTags
              .filter((tag) => !selectedTags.includes(tag.name))
              .map((tag) => (
                <ComboboxOption key={tag._id} value={tag.name} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
        <FormHelperText>
          Press <Kbd>,</Kbd> to add tag
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}

export default TagInput;
