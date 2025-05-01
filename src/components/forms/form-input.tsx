import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

export const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: FormInputProps<T>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
