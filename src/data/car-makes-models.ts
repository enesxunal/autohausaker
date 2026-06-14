export const CAR_MAKES_MODELS: Record<string, string[]> = {
  "Aston Martin": ["DB11", "DB12", "DBX", "Vantage", "DBS Superleggera"],
  Audi: ["A3", "A4", "A6", "A8", "Q5", "Q7", "Q8", "RS3", "RS6 Avant", "RS7", "e-tron GT", "R8"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga"],
  BMW: ["1 Series", "3 Series", "5 Series", "7 Series", "X3", "X5", "X6", "X7", "M3", "M4", "M5", "iX", "i4"],
  Ferrari: ["488 GTB", "488 Pista", "F8 Tributo", "Roma", "Portofino", "SF90 Stradale", "296 GTB", "812 Superfast"],
  Genesis: ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "Hyundai": ["i30", "Tucson", "Santa Fe", "Ioniq 5", "Ioniq 6", "Kona"],
  Kia: ["Ceed", "Sportage", "Sorento", "EV6", "Stinger"],
  Lamborghini: ["Huracán", "Huracán EVO", "Urus", "Aventador", "Revuelto"],
  Lexus: ["IS", "ES", "LS", "NX", "RX", "LC", "UX"],
  Maserati: ["Ghibli", "Quattroporte", "Levante", "Grecale", "MC20", "GranTurismo"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "AMG GT", "AMG GT 63 S", "EQS", "G-Class"],
  Porsche: ["911", "911 Carrera S", "911 Turbo S", "Cayenne", "Macan", "Panamera", "Taycan", "718 Boxster", "718 Cayman"],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Spectre"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Supra"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg", "ID.4", "Arteon"],
};

export const CAR_MAKES = Object.keys(CAR_MAKES_MODELS).sort();

export function getModelsForMake(make: string): string[] {
  return CAR_MAKES_MODELS[make] ?? [];
}
