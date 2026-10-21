import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { IBeneficiary, IBeneficiaryRepository, Iban, Bic } from '@clean-rn/beneficiary/domain';
import { IBeneficiaryServer } from '../types';

export class BeneficiaryApi implements IBeneficiaryRepository {
  private static instance: BeneficiaryApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getBeneficiary = this.getBeneficiary.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): BeneficiaryApi {
    if (!this.instance) {
      this.instance = new BeneficiaryApi(httpConnection);
    }
    return this.instance;
  }

  async getBeneficiary(): Promise<IBeneficiary[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/beneficiary`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const beneficiaries = await response.json();
    return beneficiaries.map((beneficiary: IBeneficiaryServer) => ({
      beneficiaryId: beneficiary.beneficiaryId,
      name: beneficiary.name,
      iban: new Iban(beneficiary.iban),
      bic: new Bic(beneficiary.bic),
    }));
  }
}
