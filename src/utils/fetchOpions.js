import chroma from 'chroma-js';
import axios from 'axios';

export async function fetchOptions() {
  const res = await axios.get('https://api.blog.redberryinternship.ge/api/categories', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
  const result = res.data.data;
  return result.map((el) => {
    return {
      value: el.id,
      label: el.title,
      color: el.background_color,
    };
  });
}

export const categoryStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '288px',
    borderRadius: '12px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : undefined,
      color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '30px',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};
