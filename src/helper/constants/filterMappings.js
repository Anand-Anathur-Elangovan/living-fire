const filterMappings = {
  fireplaceType: {
    1: "fire-place",
    2: "gas-fireplace",
    3: "wood-fireplace",
    4: "electric-fireplace",
  },
  installationType: {
    3: "wall-mounted",
    4: "built-in",
  },
  glassOrientationType: {
    2: "three-sided",
    3: "front-facing",
  },
  brand: {
    3: "brand-name",
    4: "another-brand",
  },
  rangeType: {
    10: "premium",
    20: "economy",
  },
};

const filterMappingsMock = [
  {
    id: 1,
    value: "fire place",
    filterType: "type",
  },
  {
    id: 3,
    value: "Fireplace Mantels",
    filterType: "type",
  },
  {
    id: 1,
    value: "Regency",
    filterType: "brand",
  },
  {
    id: 2,
    value: "Bosq",
    filterType: "brand",
  },
];

export default filterMappings;
