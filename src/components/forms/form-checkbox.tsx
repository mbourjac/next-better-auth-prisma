import { FieldValues } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { FormInputProps } from './form-input';

type FormCheckboxProps<T extends FieldValues> = Pick<
  FormInputProps<T>,
  'form' | 'name' | 'label'
>;

export const FormCheckbox = <T extends FieldValues>({
  form,
  name,
  label,
}: FormCheckboxProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="cursor-pointer"
              />
            </FormControl>
            <FormLabel className="cursor-pointer">{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};
