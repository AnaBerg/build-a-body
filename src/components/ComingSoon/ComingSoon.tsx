import Link from 'next/link';

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-2">
      <h1 className="text-4xl font-extrabold">COMING SOON</h1>
      <p>
        This page still been worked on, soon the{' '}
        <span className="font-semibold text-primary">{pageName}</span> will be
        out and ready!
      </p>
      <Link
        href="/"
        className="text-lg text-primary underline transition-colors hover:text-primary/80"
      >
        Take me home
      </Link>
    </div>
  );
};

export default ComingSoon;
