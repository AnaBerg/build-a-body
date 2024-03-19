'use client';

import { useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface AccordionProps extends React.PropsWithChildren {
  title: string;
  startOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, startOpen = false }) => {
  const [open, setOpen] = useState(startOpen);
  const parentAcc = useRef(null);

  useEffect(() => {
    parentAcc.current && autoAnimate(parentAcc.current);
  }, [parentAcc]);

  return (
    <div
      ref={parentAcc}
      className="w-full cursor-pointer rounded-sm border border-gray-600 bg-gray-700"
    >
      <div
        onClick={() => setOpen((p) => !p)}
        className={`w-full ${open && 'border-b'} flex justify-between p-2.5`}
      >
        <p>{title}</p>
        <ChevronDownIcon
          className={`h-5 w-5 stroke-2 text-white ${open && 'rotate-180'} duration-300 ease-in-out`}
        />
      </div>
      {open && <div className="p-2.5">{children}</div>}
    </div>
  );
};

export default Accordion;
