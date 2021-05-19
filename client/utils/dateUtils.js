import localizer from 'react-big-calendar/lib/localizers/moment';
import moment from 'moment';

export const momomentLocalizer = localizer(moment);

export const getDateString = (date) => {
  return new Date(date).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const startAccessor = (event) => {
  return new Date(event.date);
};

export const endAccessor = (event) => {
  const end = new Date(event.date);
  end.setHours(end.getHours() + 1);
  return end;
};
