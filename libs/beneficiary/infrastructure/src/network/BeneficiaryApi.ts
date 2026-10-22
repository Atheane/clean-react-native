import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  IBeneficiary,
  IAddBeneficiaryCommand,
  IDeleteBeneficiaryCommand,
  IBeneficiaryRepository,
} from '@clean-rn/beneficiary/domain';
import { inplaceSortByName } from '@clean-rn/ui-mobile';

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
    inplaceSortByName(beneficiaries);
    return beneficiaries;
  }

  async addBeneficiary(beneficiary: IAddBeneficiaryCommand): Promise<IBeneficiary> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/beneficiary`,
      this.connection.options(IHttpVerb.POST, beneficiary),
    );
    await this.connection.handleError(response);
    return response.json();
  }

  async deleteBeneficiary(beneficiary: IDeleteBeneficiaryCommand): Promise<IBeneficiary> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/beneficiary/${beneficiary.beneficiaryId}`,
      this.connection.options(IHttpVerb.DELETE),
    );
    await this.connection.handleError(response);
    return response.json();
  }
}
