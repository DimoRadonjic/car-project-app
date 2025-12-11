import { date } from 'quasar';

export function formatDateDDMMYYYY(newDate: Date): string {
  return date.formatDate(newDate, 'DD/MM/YYYY');
}

export function formatDateYYYYMMDD(newDate: Date): string {
  return date.formatDate(newDate, 'YYYY-MM-DD');
}

export function toFormattedDate(dateString: string, format: 'YYYY-MM-DD' | 'DD/MM/YYYY'): string {
  if (dateString.includes('/')) {
    const [day, month, year]: number[] = dateString.split('/').map(Number);

    if (day && month && year) {
      const date = new Date(year, month - 1, day);

      return format === 'DD/MM/YYYY'
        ? formatDateDDMMYYYY(new Date(date))
        : formatDateYYYYMMDD(new Date(date));
    }
  } else {
    return format === 'DD/MM/YYYY'
      ? formatDateDDMMYYYY(new Date(dateString))
      : formatDateYYYYMMDD(new Date(dateString));
  }
  return 'Invalid Date';
}

export function toDate(dateString: string): Date {
  return new Date(dateString);
}

export function getCurrentDate() {
  return formatDateDDMMYYYY(new Date());
}

export function isValidDate(val: string) {
  if (!val) return false;

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = val.match(regex);

  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);

  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;

  return true;
}
