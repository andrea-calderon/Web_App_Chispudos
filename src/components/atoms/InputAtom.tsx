
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import TextAtom from './TextAtom';

type AuthInputFieldProps = {
  variant: 'outlined' | 'underlined' | 'rounded';
  label: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  errorMsg?: string;
  helperText?: string;
  error?: boolean;
  type?: string;
};

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  variant,
  label,
  placeholder,
  leftIcon,
  errorMsg,
  helperText,
  error,
  type = 'text',
  ...props
}) => {
  const theme = useTheme();


  const getInputStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderRadius: '8px',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.light,
            },
            ...(error && {
              '& fieldset': {
                borderColor: theme.palette.error.main,
              },
            }),
          },
        };
      case 'underlined':
        return {
          width: '100%',
          '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.secondary.main,
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: theme.palette.secondary.dark,
          },
          '& .MuiInput-underline.Mui-focused:before': {
            borderBottomColor: theme.palette.secondary.light,
          },
          ...(error && {
            '&:before': {
              borderBottomColor: theme.palette.error.main,
            },
          }),
        };
      case 'rounded':
        return {
          borderRadius: '100px',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '100px',
            '& fieldset': {
              borderColor: theme.palette.tertiary.main,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.tertiary.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.tertiary.light,
            },
            ...(error && {
              '& fieldset': {
                borderColor: theme.palette.error.main,
              },
            }),
          },
        };
      default:
        return {};
    }
  };

  return (
    <TextField
      variant={variant === 'underlined' ? 'standard' : 'outlined'}
      label={label}
      placeholder={placeholder}
      error={error || !!errorMsg}
      helperText={
        errorMsg ? (
          <TextAtom variant="body" size="small">
            {errorMsg}
          </TextAtom>
        ) : helperText ? (
          <TextAtom variant="body" size="small">
            {helperText}
          </TextAtom>
        ) : undefined
      }
      {...props}
      InputProps={{
        startAdornment: leftIcon ? (
          <InputAdornment position="start">{leftIcon}</InputAdornment>
        ) : null,
        endAdornment:
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      sx={getInputStyles()}
    />
  );
};

export default AuthInputField;
