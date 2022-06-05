import { Tag, TagLabel, Wrap } from '@chakra-ui/react';
import { useMemo } from 'react';

const colors = [
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
];

function TagsList({ tags }) {
  const startIndex = useMemo(
    () => Math.floor(Math.random() * (colors.length - 3)),
    []
  );

  return (
    <Wrap spacing={2}>
      {tags.map((tag, i) => (
        <Tag
          key={tag._id}
          variant="outline"
          colorScheme={colors[startIndex + i]}
        >
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      ))}
    </Wrap>
  );
}

export default TagsList;
