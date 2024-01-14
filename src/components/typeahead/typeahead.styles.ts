enum Color {
  White = '#fff',
  LightGray1 = '#AFADA3',
  DarkGay3 = '#61615F',
}

export const TypeaheadStyles = {
  '.MuiAutocomplete-input': {
    color: Color.White,
  },

  '.MuiInputBase-root': {
    borderRadius: '9px',
    minWidth: '256px',
    '& fieldset, &:hover fieldset': {
      borderColor: Color.LightGray1,
    },

    '.MuiInputAdornment-root': {
      color: Color.LightGray1,
    },

    '&.Mui-focused': {
      fieldset: {
        borderColor: Color.White,
      },
      '.MuiInputAdornment-root, .MuiAutocomplete-endAdornment > button': {
        color: Color.White,
      },
      '.MuiAutocomplete-endAdornment > button': {
        border: '1px solid #fff',
        borderRadius: '50%',
        '.MuiSvgIcon-root': {
          height: '.7em',
          width: '.7em',
        },
      },
    },
  },

  '.MuiAutocomplete-popper > *': {
    backgroundColor: 'blue!important',
  },
};

export const TypeaheadDropdownStyles = {
  ul: {
    padding: '0 8px',
  },
  '&, li': {
    backgroundColor: Color.DarkGay3,
    color: Color.White,
    'li + li': {
      borderTop: `1px solid ${Color.LightGray1}`,
    },
  },
};
