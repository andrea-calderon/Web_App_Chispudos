import {
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import TextAtom from './TextAtom';
import { Field } from 'formik';

interface InputAtomProps extends Omit<TextFieldProps, 'variant'> {
  variant: 'outlined' | 'underlined' | 'rounded';
  label: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMsg?: string;
  helperText?: string;
  name: string;
  type?: string;
}

const InputAtom: React.FC<InputAtomProps> = ({
  variant,
  label,
  placeholder,
  leftIcon,
  rightIcon,
  errorMsg,
  helperText,
  type = 'text',
  name,
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
            ...(errorMsg && {
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
          ...(errorMsg && {
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
            ...(errorMsg && {
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
    <Field name={name}>
      {({ field, form: { isSubmitting } }) => (
        <TextField
          {...field}
          type={type}
          variant={variant === 'underlined' ? 'standard' : 'outlined'}
          label={label}
          placeholder={placeholder}
          error={errorMsg}
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
          slotProps={{
            input: {
              startAdornment: leftIcon ? (
                <InputAdornment position="start">{leftIcon}</InputAdornment>
              ) : null,
              endAdornment:rightIcon ? (
                <InputAdornment position="start">{rightIcon}</InputAdornment>
              ) : null,
            },
          }}
          sx={[
            getInputStyles(),
            ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
          ]}
        />
      )}
    </Field>
  );
};

export default InputAtom;
