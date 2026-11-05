export const initialFootprintState = {
  pending: false,
  estimate: {
    house: { data: null, footprint: null, average: null },
    transport: { data: null, footprint: null, average: null },
    food: { data: null, footprint: null, average: null },
    fly: { data: null, footprint: null, average: null },
  },
  footprint: null,
  house: null,
  transport: null,
  error: null,
};
