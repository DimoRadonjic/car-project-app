import { date } from 'quasar';

export function formatDate(newDate: Date): string {
  return date.formatDate(newDate, 'DD/MM/YYYY');
}

export function toFormattedDate(dateString: string): string {
  return formatDate(new Date(dateString));
}

export function toDate(dateString: string): Date {
  return new Date(dateString);
}

export function getCurrentDate() {
  return formatDate(new Date());
}

export function validateDate(val: string) {
  if (!val || !date.isValid(val)) return false;

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = val.match(regex);

  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);

  console.log('day', day);
  console.log('month', month);

  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;

  return true;
}
