export interface Link
{
  texto: string;
  url: string;
  nomeIcone: string;
}

export const links: Array<Link> = [
  { texto: 'Lista de Pessoas', url: '/listapessoas', nomeIcone: 'portrait' },
];
