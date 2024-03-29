'use client';

import { Input, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

interface DatePickerInputProps {
  initialDate: Date;
  name: string;
  onChange: () => void;
  label: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  initialDate,
  name,
  onChange,
  label,
}) => {
  return (
    <>
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            placeholder=""
            color="white"
            name={name}
            id={name}
            label={label}
            onChange={() => null}
            value={initialDate ? format(initialDate, 'PPP') : ''}
            className="bg-gray-700 disabled:bg-gray-600"
            crossOrigin={undefined}
          />
        </PopoverHandler>
        <PopoverContent className="rounded-sm" placeholder="">
          <DayPicker
            mode="single"
            selected={initialDate}
            onSelect={onChange}
            showOutsideDays
            className="border-0"
            classNames={{
              caption: 'flex justify-center py-2 mb-4 relative items-center',
              caption_label: 'text-sm font-medium text-gray-900',
              nav: 'flex items-center',
              nav_button:
                'h-6 w-6 bg-transparent hover:bg-gray-50 p-1 rounded-sm transition-colors duration-300',
              nav_button_previous: 'absolute left-1.5',
              nav_button_next: 'absolute right-1.5',
              table: 'w-full border-collapse',
              head_row: 'flex font-medium text-gray-900',
              head_cell: 'm-0.5 w-9 font-normal text-sm',
              row: 'flex w-full mt-2',
              cell: 'text-gray-600 rounded-sm h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-sm [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm focus-within:relative focus-within:z-20',
              day: 'h-9 w-9 p-0 font-normal',
              day_range_end: 'day-range-end',
              day_selected:
                'rounded-sm bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
              day_today: 'rounded-sm bg-gray-200 text-gray-900',
              day_outside:
                'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
              day_disabled: 'text-gray-500 opacity-50',
              day_hidden: 'invisible',
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePickerInput;
