import * as yup from "yup";
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormTrigger,
} from "react-hook-form";
import debounce from "lodash.debounce";
import DOMPurify from "dompurify";

export const imageSchema = yup
  .object()
  .transform((v) => (!!v ? v : undefined))
  .shape({
    id: yup.string().nullable(true),
    name: yup.string().nullable(true),
    url: yup.string().trim().required().url(),
  });

export const tagSchema = yup.object().shape({
  title: yup.string().trim().min(2).required(),
});

export const registerDebounceValidation = <TFieldValues extends FieldValues>(
  name: FieldPath<TFieldValues>,
  delay: number,
  trigger: UseFormTrigger<TFieldValues>,
  register: UseFormRegister<TFieldValues>,
  options?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
) => {
  const useFormRegisterReturn: UseFormRegisterReturn = register(name, options);
  const { onChange } = useFormRegisterReturn;
  const debouncedValidate = debounce(() => {
    trigger(name);
  }, delay);
  return {
    ...useFormRegisterReturn,
    onChange: (e: any) => {
      onChange(e);
      debouncedValidate();
    },
  };
};

export const purifyHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
};
