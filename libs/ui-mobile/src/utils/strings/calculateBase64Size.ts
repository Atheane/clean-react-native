export const calculateBase64Size = (base64: string) => {
  // Remplacer les caractères non-Base64 par du vide (pour la sécurité)
  const cleanedBase64String = base64.replace(/[^A-Za-z0-9+/=]/g, '');

  // Calculer la taille en octets de la chaîne Base64
  const base64Length = cleanedBase64String.length;

  // Trouver et soustraire le nombre de caractères de remplissage
  const padding = (cleanedBase64String.match(/=/g) || []).length;

  // Calculer la taille réelle des données binaires
  return ((base64Length - padding) * 3) / 4;
};
