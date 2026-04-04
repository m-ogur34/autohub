// Müşteri Model Tanımlamaları

export enum CustomerType {
  INDIVIDUAL = 'INDIVIDUAL',     // Bireysel
  CORPORATE = 'CORPORATE'        // Kurumsal
}

/**
 * Müşteri modeli - backend Customer entity ile eşleşir
 */
export interface Customer {
  id: number;
  tcIdentityNumber: string;      // T.C. Kimlik Numarası
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  drivingLicenseNumber?: string;
  licenseExpiryDate?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  customerType: CustomerType;
  companyName?: string;
  taxNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCustomerRequest {
  tcIdentityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  drivingLicenseNumber?: string;
  licenseExpiryDate?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  customerType: CustomerType;
  companyName?: string;
  taxNumber?: string;
  notes?: string;
}
