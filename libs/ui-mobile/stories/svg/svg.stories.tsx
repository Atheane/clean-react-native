import React from 'react';
import { View } from 'react-native';
import * as SVGIcons from '../../src/assets/svg';

const customSizeSVGs = {
  BANKLogo: SVGIcons.BANKLogo,
  KycId: SVGIcons.KycId,
  Shield: SVGIcons.Shield,
  RedCross: SVGIcons.RedCross,
  OffBlueGradient: SVGIcons.OffBlueGradient,
  KycResidencePermit: SVGIcons.KycResidencePermit,
  KycIdentification: SVGIcons.KycIdentification,
  KycPassport: SVGIcons.KycPassport,
  IbanV2: SVGIcons.IbanV2,
  FlagForFrance: SVGIcons.FlagForFrance,
  FlagForGermany: SVGIcons.FlagForGermany,
  FlagForGreece: SVGIcons.FlagForGreece,
  FlagForItaly: SVGIcons.FlagForItaly,
  FlagForSpain: SVGIcons.FlagForSpain,
  FlagForUK: SVGIcons.FlagForUK,
  BankLogoCA: SVGIcons.BankLogoCA,
  BankBgGradient: SVGIcons.BankBgGradient,
  BankAltLogo: SVGIcons.BankAltLogo,
  CarbonFootprint: SVGIcons.CarbonFootprint,
  TopRightFlowersBg: SVGIcons.TopRightFlowersBg,
  TopBlueBg: SVGIcons.TopBlueBg,
  BottomLeavesBg: SVGIcons.BottomLeavesBg,
  TopLeavesBg: SVGIcons.TopLeavesBg,
  CertificateBlueGradient: SVGIcons.CertificateBlueGradient,
  CardBank: SVGIcons.CardBank,
  Unlock: SVGIcons.Unlock,
  Flowers: SVGIcons.Flowers,
};

const customSizeColorSVGs = {
  StepCurrent: SVGIcons.StepCurrent,
  StepDone: SVGIcons.StepDone,
  StepEmpty: SVGIcons.StepEmpty,
  StepsConnector: SVGIcons.StepsConnector,
  Warning: SVGIcons.Warning,
  TransactionAlcohol: SVGIcons.TransactionAlcohol,
  TransactionArt: SVGIcons.TransactionArt,
  TransactionAssurance: SVGIcons.TransactionAssurance,
  TransactionBank: SVGIcons.TransactionBank,
  TransactionBar: SVGIcons.TransactionBar,
  TransactionClothing: SVGIcons.TransactionClothing,
  TransactionCulture: SVGIcons.TransactionCulture,
  TransactionDiverse: SVGIcons.TransactionDiverse,
  TransactionEndowment: SVGIcons.TransactionEndowment,
  TransactionFuel: SVGIcons.TransactionFuel,
  TransactionHealth: SVGIcons.TransactionHealth,
  TransactionHighTech: SVGIcons.TransactionHighTech,
  TransactionHousing: SVGIcons.TransactionHousing,
  TransactionLegal: SVGIcons.TransactionLegal,
  TransactionLeisure: SVGIcons.TransactionLeisure,
  TransactionNumeric: SVGIcons.TransactionNumeric,
  TransactionNutrition: SVGIcons.TransactionNutrition,
  TransactionNursing: SVGIcons.TransactionNursing,
  TransactionPro: SVGIcons.TransactionPro,
  TransactionProcurement: SVGIcons.TransactionProcurement,
  TransactionRestaurant: SVGIcons.TransactionRestaurant,
  TransactionSchooling: SVGIcons.TransactionSchooling,
  TransactionSubscription: SVGIcons.TransactionSubscription,
  TransactionTransport: SVGIcons.TransactionTransport,
  TransactionTravel: SVGIcons.TransactionTravel,
  TransactionVehicle: SVGIcons.TransactionVehicle,
  Winter: SVGIcons.Winter,
  Summer: SVGIcons.Summer,
  WinterHouse: SVGIcons.WinterHouse,
  SummerHouse: SVGIcons.SummerHouse,
  Thermometer: SVGIcons.Thermometer,
  SnowFlake: SVGIcons.SnowFlake,
  Plus: SVGIcons.Plus,
  Minus: SVGIcons.Minus,
};

const customSizeColorGradientSVGs = Object.keys(SVGIcons).reduce((acc, key) => {
  if (!Object.keys(customSizeSVGs).includes(key) && !Object.keys(customSizeColorSVGs).includes(key)) {
    acc[key] = Object.assign({}, SVGIcons[key]); // create a neww copy of SVG
  }
  return acc;
}, {});

export default {
  title: 'SVG Icons',
  argTypes: {
    width: { control: { type: 'number', min: 16, max: 128, step: 1 } },
    height: { control: { type: 'number', min: 16, max: 128, step: 1 } },
    color: { control: 'color' },
    startColor: { control: 'color' },
    endColor: { control: 'color' },
    selectedIcon: {
      control: 'select',
      options: Object.keys(customSizeColorGradientSVGs),
    },
  },
};

const IconWrapper = ({ selectedIcon, ...props }) => {
  const SelectedIcon = SVGIcons[selectedIcon]; // Accède directement au composant SVG
  const mergedProps = Object.assign({}, SelectedIcon.defaultProps, props); // merge default props with customiozable props
  return SelectedIcon ? <SelectedIcon {...mergedProps} /> : null;
};

export const CustomSize = ({ selectedIcon, width, height }) => {
  const SelectedIcon = customSizeSVGs[selectedIcon];
  return (
    <View style={{ padding: 20 }}>
      {SelectedIcon ? <IconWrapper selectedIcon={selectedIcon} width={width} height={height} /> : null}
    </View>
  );
};

CustomSize.args = {
  selectedIcon: Object.keys(customSizeSVGs)[0],
};

CustomSize.argTypes = {
  selectedIcon: {
    control: 'select',
    options: Object.keys(customSizeSVGs),
  },
  width: { control: { type: 'number', min: 16, max: 300, step: 1 } },
  height: { control: { type: 'number', min: 16, max: 300, step: 1 } },
  color: { control: false },
  startColor: { control: false },
  endColor: { control: false },
};

export const CustomSizeColor = ({ selectedIcon, width, height, color }) => {
  const SelectedIcon = customSizeColorSVGs[selectedIcon];
  return (
    <View style={{ padding: 20 }}>
      {SelectedIcon ? (
        <IconWrapper selectedIcon={selectedIcon} width={width} height={height} color={color} />
      ) : null}
    </View>
  );
};

CustomSizeColor.args = {
  selectedIcon: Object.keys(customSizeColorSVGs)[0],
};

CustomSizeColor.argTypes = {
  selectedIcon: {
    control: 'select',
    options: Object.keys(customSizeColorSVGs),
  },
  width: { control: { type: 'number', min: 16, max: 128, step: 1 } },
  height: { control: { type: 'number', min: 16, max: 128, step: 1 } },
  color: { control: 'color' },
  startColor: { control: false },
  endColor: { control: false },
};

export const CustomSizeColorGradient = ({ selectedIcon, width, height, color, startColor, endColor }) => (
  <View style={{ padding: 20 }}>
    <IconWrapper
      selectedIcon={selectedIcon}
      width={width}
      height={height}
      color={color}
      startColor={startColor}
      endColor={endColor}
    />
  </View>
);

CustomSizeColorGradient.args = {
  selectedIcon: Object.keys(customSizeColorGradientSVGs)[0],
};
