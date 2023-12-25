import React from 'react';
import AsyncSelect from 'react-select/async';

const filterColors = (inputValue) => {
  return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};
const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default () => <AsyncSelect isMulti cacheOptions defaultOptions loadOptions={promiseOptions} />;
