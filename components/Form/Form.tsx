import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormProps extends React.PropsWithChildren {
  methods: UseFormReturn<any, any, undefined>;
  onSubmit: SubmitHandler<any>;
  className?: string;
}

const Form: React.FC<FormProps> = ({ methods, children, onSubmit, className }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
