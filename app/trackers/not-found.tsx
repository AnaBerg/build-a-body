import Link from 'next/link';

const NotFound = () => {
  return (
    <main>
      <p>Not Found</p>
      <p>Could not find requested resource</p>
      <Link className="text-white" href="/">
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
