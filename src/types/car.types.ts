export type CarRegistration = {
  registrationNumber: string;
  expiryDate: string;
  vinNumber: string;
};

export type CarInformation = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  onSale: boolean;
  sold: boolean;
  repairHistory: string;
  registrationDetails: CarRegistration;
  furtherRepairsNeeded?: boolean;
};
