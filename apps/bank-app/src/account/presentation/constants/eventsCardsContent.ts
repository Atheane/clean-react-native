import {
  CardBANK,
  CardContract,
  CardEG,
  CardLoanHeater,
  CardPremium,
  CardRocket,
  CardTeam,
  CardWorkflow,
} from '../assets/svg';

export const eventsCardsContent = [
  {
    icon: CardBANK,
    text: 'Notre Carte de paiement pour économiser du CO2',
    uid: 'card',
  },
  { image: CardEG, text: 'Nos prêts pour décarboner l’économie', uid: 'loan' },
  {
    icon: CardLoanHeater,
    text: 'Notre offre de prêt pour changer de chaudière',
    uid: 'loan-heater',
  },
  {
    icon: CardPremium,
    text: 'Soyez récompensé grâce à nos primes',
    uid: 'carbon-premium',
  },
  {
    icon: CardTeam,
    text: 'Manifeste',
    uid: 'manifesto',
  },
  {
    icon: CardWorkflow,
    text: 'Notre histoire',
    uid: 'history',
  },
  {
    icon: CardEG,
    text: 'Comment fonctionnent les euros-verts ?',
    uid: 'green-euro',
  },
  {
    icon: CardRocket,
    text: 'Nos objectifs et nos limites',
    uid: 'currency',
  },
  {
    icon: CardContract,
    text: 'Notre blog sur le monde bancaire et l’urgence climatique',
    uid: 'article',
  },
];
