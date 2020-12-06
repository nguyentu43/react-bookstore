import { HStack, Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { FcLock } from 'react-icons/fc';

export default function (
  Comp,
  { value: initialValue, column },
  rules = null,
  clickToEdit = false,
  size = 'sm'
) {
  return ({ children, ...rest }) => {
    const [isEdit, setEdit] = useState(!clickToEdit);
    const [value, setValue] = useState(initialValue || '');
    const [error, setError] = useState(false);
    const [errorLabel, setErrorLabel] = useState('');
    const input = useRef(null);

    const props = useMemo(
      () => ({
        value,
        onChange,
        onBlur,
        ref: input,
        size,
        isInvalid: error,
      }),
      [value, error]
    );

    function onChange(e) {
      setValue(e.target.value);
    }

    function onBlur(e) {
      if (rules) {
        const value = e.target.value.toString().trim();
        for (const rule of rules) {
          switch (rule) {
            case 'required':
              if (value === '') {
                input.current.focus();
                setError(true);
                setErrorLabel('This field is required');
                return;
              }
              break;
            case 'email':
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                input.current.focus();
                setError(true);
                setErrorLabel('This field is a email');
                return;
              }
              break;
          }
        }
      }

      setError(false);
      console.log(column.id, value, 'Save');
    }

    return (
      <Tooltip
        colorScheme="red"
        label={errorLabel}
        isOpen={error}
        shouldWrapChildren
        hasArrow={true}
      >
        <HStack>
          {children ? (
            <Comp {...rest} {...props} isDisabled={!isEdit}>
              {children}
            </Comp>
          ) : (
            <Comp {...rest} {...props} isDisabled={!isEdit} />
          )}
          {clickToEdit && !isEdit && <IconButton size="sm" icon={<Icon as={FcLock} />} onClick={() => setEdit(true)}/>}
        </HStack>
      </Tooltip>
    );
  };
}
