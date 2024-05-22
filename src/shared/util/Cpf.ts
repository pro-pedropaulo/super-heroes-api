import AppError from '../errors/appError';

export class CPF {
  private static readonly CHECK_DIGIT_FACTOR_ONE = 10;
  private static readonly CHECK_DIGIT_FACTOR_TWO = 11;

  private constructor(readonly value: string) {
    Object.freeze(this);
  }

  static create(cpf: string) {
    if (!this.validate(cpf)) throw new AppError(`Invalid CPF: ${cpf}`);
    return new CPF(cpf);
  }

  private static validate(value: string) {
    if (!value) return false;
    if (this.isTaxIDOutOfRange(value)) return false;
    const cleanTaxID = this.isTaxIDAlreadyClean(value)
      ? value
      : this.clearTaxID(value);
    if (this.hasAllSameDigits(cleanTaxID)) return false;
    const firstCheckDigit = this.calculateCheckDigit(
      cleanTaxID,
      this.CHECK_DIGIT_FACTOR_ONE,
    );
    const secondCheckDigit = this.calculateCheckDigit(
      cleanTaxID,
      this.CHECK_DIGIT_FACTOR_TWO,
    );
    const calculatedCheckDigit = `${firstCheckDigit}${secondCheckDigit}`;
    const checkDigits = this.extractCheckDigits(cleanTaxID);
    return calculatedCheckDigit === checkDigits;
  }

  private static isTaxIDOutOfRange(value: string) {
    return value.length !== 11 && value.length !== 14;
  }

  private static isTaxIDAlreadyClean(value: string) {
    return value.length === 11;
  }

  private static clearTaxID(value: string) {
    return value.replace(/[.-]/g, '');
  }

  private static hasAllSameDigits(value: string) {
    const firstDigit = value[0];
    return [...value].every((digit) => digit === firstDigit);
  }

  private static calculateCheckDigit(value: string, factor: number) {
    const TAX_ID_LENGTH = 11;
    let checkDigit = 0;
    for (const digit of value) {
      if (factor > 1) checkDigit += parseInt(digit) * factor--;
    }
    const rest = checkDigit % TAX_ID_LENGTH;
    return rest < 2 ? 0 : TAX_ID_LENGTH - rest;
  }

  private static extractCheckDigits(value: string) {
    const { length } = value;
    const firstCheckDigit = value[length - 2];
    const secondCheckDigit = value[length - 1];

    return `${firstCheckDigit}${secondCheckDigit}`;
  }
}
