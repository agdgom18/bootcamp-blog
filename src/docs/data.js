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

export const categoryOptions = [
  { value: '1', label: 'მარკეტი', color: '#1AC7A8' },
  { value: '2', label: 'აპლიკაცია', color: '#5243AA' },
  { value: '3', label: 'Red', color: '#FF5630' },
  { value: '4', label: 'Orange', color: '#FF8B00' },
  { value: '5', label: 'Yellow', color: '#FFC400' },
  { value: '6', label: 'Green', color: '#36B37E' },
  { value: '7', label: 'Forest', color: '#00875A' },
  { value: '8', label: 'Slate', color: '#253858' },
  { value: '9', label: 'Silver', color: '#666666' },
];

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

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];
