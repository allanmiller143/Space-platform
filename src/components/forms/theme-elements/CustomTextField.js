/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({

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
            <IconButton onClick={togglePasswordVisibility} edge="end" style={{ paddingRight: 10 }}>
              {showPassword ? <IoMdEyeOff /> : <FaEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ToggleableTextField;
