export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('pt-BR');
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) {
    return `${rest}min`;
  }
  return rest === 0 ? `${hours}h` : `${hours}h${rest}`;
}

export function encodeTimeSpent(date: string, minutes: number): string {
  return `${date}T${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:00`;
}

export function decodeTimeSpent(timeSpent: string): number {
  const date = new Date(timeSpent);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }
  return date.getHours() * 60 + date.getMinutes();
}

export function daysUntil(iso: string): number {
  const deadline = new Date(`${iso}T23:59:59`);
  const now = new Date();
  return Math.ceil((deadline.getTime() - now.getTime()) / 86_400_000);
}
