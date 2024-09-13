/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const ToggleableTextField = ({ type = 'text', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Define o tipo do campo
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <CustomTextField
      {...props}
      type={inputType}
      InputProps={{
        // Exibe o ícone de olho apenas se o tipo for 'password'
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <IoMdEyeOff /> : <FaEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ToggleableTextField;
