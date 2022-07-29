import { Stack, Text, IconButton } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';

const icons = [null, <CheckIcon />, <CloseIcon />];
const colors = ["gray", "green", "red"];

function TagFilterItem({ id, name, value, onClick }) {
  return (
    <Stack direction="row" sx={{
      userSelect: 'none'
    }}>
      <IconButton as="label" htmlFor={id} icon={icons[value]} size="xs" colorScheme={colors[value]} />
      <input
        type="checkbox"
        id={id}
        value={value}
        onChange={() => onClick(id, value === 2 ? 0 : value + 1)}
        checked={value !== 0}
        style={{ opacity: 0, position: 'absolute', visibility: 'hidden' }}
      />
      <Text as="label" htmlFor={id}>{name}</Text>
    </Stack>
  );
}

export default TagFilterItem;
