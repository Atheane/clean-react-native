import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { IAccount, IAccountRepository, Iban, Bic } from '@clean-rn/account/domain';
import { IAccountServer } from '../types';

export class AccountApi implements IAccountRepository {
  private static instance: AccountApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getAccounts = this.getAccounts.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): AccountApi {
    if (!this.instance) {
      this.instance = new AccountApi(httpConnection);
    }
    return this.instance;
  }

  async getAccounts(): Promise<IAccount[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/account`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const accounts = await response.json();
    console.log('------------ 1 getAccounts', accounts);
    return accounts.map((account: IAccountServer) => ({
      accountId: account.accountId,
      accountType: account.accountType,
      authorizedBalance: account.authorizedBalance,
      iban: new Iban(account.iban),
      bic: new Bic(account.bic),
    }));
  }
}
