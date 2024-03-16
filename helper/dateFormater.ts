import { format } from 'date-fns';

const dateFormater = (date: Date): string => format(date, 'PPP');

export default dateFormater;
