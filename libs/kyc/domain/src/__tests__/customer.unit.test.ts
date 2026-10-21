import { IDocumentCategory, IDocumentStatus, IDocumentStatusCode, IDocumentType } from '../types';
import { Customer } from '../entities';
import { KYC_REVIEW } from '@clean-rn/auth/domain';

describe('Customer - unit', () => {
  it('should create a Customer with init status and provided id', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false } });
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.id).toEqual('1');
  });

  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if ID and TAX_CERTIFICATE as W9', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: true, status: KYC_REVIEW.PENDING } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.REFUSED,
      },
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents.W9?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents.ID?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if TAX_CERTIFICATE as RESIDENCE_PROOF', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false, status: KYC_REVIEW.PENDING } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as REFUSED if verso ID is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.PENDING, USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INCOHERENT,
      },
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
      {
        typeId: IDocumentType.PASSPORT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents?.ID?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
  });

  it('should be complete if USPerson and  W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.PENDING, USPerson: true } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.TRUNCATED,
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.TRUNCATED,
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(true);
    expect(customer.properties.kyc?.documents?.W9?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.ID?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should be complete if not USPerson and  not W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.PENDING, USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.TRUNCATED,
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.REFUSED,
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(true);
    expect(customer.properties.kyc?.documents?.ID?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should allocate documents correctly for Residence Proof', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false, status: KYC_REVIEW.PENDING } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.REFUSED,
      },
      {
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents?.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should be VALIDATED if customer status is VALIDATED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.VALIDATED },
    });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
      {
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.VALIDATED);
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents?.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });
});
