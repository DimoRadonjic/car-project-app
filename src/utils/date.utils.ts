export function formatDate(dateString: Date): string {
  const date = new Date(dateString).toLocaleDateString('sr-Sr');

  return date.replaceAll('. ', '/').slice(0, -1);
}
