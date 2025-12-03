export type CarRegistration = {
  registrationNumber: string;
  expiryDate: string;
};

export type CarInformation = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  onsale: boolean;
  sold: boolean;
  repairHistory: string[];
  registrationDetails: CarRegistration;
  furtherRepairsNeeded?: boolean;
};
