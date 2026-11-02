export enum HEATER_TYPE {
  URBAN = 'URBAN', // District Heating - ?
  ELECTRIC = 'ELECTRIC', // Electric - KWh
  FUEL_OIL = 'FUEL_OIL', // Domestic Fuel Oil - L
  GAS = 'GAS', // Domestic Gas - Kg
  COAL = 'COAL', // Coal - Kg
  HEAT_PUMP = 'HEAT_PUMP', // Heat Pump (electric)
  THERMAL_SOLAR = 'THERMAL_SOLAR', // Thermal Solar (electric)
  PROPANE = 'PROPANE', // Propane - Kg
  WOOD = 'WOOD', // Firewood / Coal - Kg
}

export enum HEATER_USAGE {
  MAIN = 'MAIN',
  SECONDARY = 'SECONDARY',
  SANITARY = 'SANITARY',
}

export enum HOUSE_STATUS {
  OCCUPIED = 'OCCUPIED',
  LEFT = 'LEFT',
}

export enum FOOTPRINT_UNIT {
  CO2 = 'CO2',
}

export enum HOUSE_WORK_TYPE {
  ROOF = 'ROOF',
  WALL = 'WALL',
  GROUND = 'GROUND',
  WINDOW = 'WINDOW',
  VMC = 'VMC',
}

export enum VEHICLE_STATUS {
  DESTROYED = 'DESTROYED',
  PARKED = 'PARKED',
  OWNED = 'OWNED',
  SOLD = 'SOLD',
}
