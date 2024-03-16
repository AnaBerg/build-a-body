interface PaperProps extends React.PropsWithChildren {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const Paper: React.FC<PaperProps> = ({ children, className, ref }) => {
  return (
    <div ref={ref} className={`rounded-sm border border-gray-600 bg-gray-700` + ' ' + className}>
      {children}
    </div>
  );
};

export default Paper;
