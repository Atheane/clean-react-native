export type IHeaterProps = {
  usage: 'MAIN' | 'SANITARY' | 'SECONDARY';
  heatType: string;
  installationYear?: number;
  previousHeatType?: string;
};
