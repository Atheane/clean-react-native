import { IDocumentCategory, IDocumentStatus, IDocumentStatusCode, IDocumentType, IKycState } from '../types';
import { Customer } from '../entities';
import { KYC_REVIEW } from '@clean-rn/auth/domain';

describe('Customer - unit', () => {
  it('should create a Customer with init status NONE and provided id', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false } });
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.id).toEqual('1');
  });

  it('should set customer as REFUSED if one of teh documents is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: true, status: KYC_REVIEW.REFUSED } });
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
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
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

  it('should set customer as PENDING status and documents at DOCUMENTS_VALIDATED if customer is USPerson, W9, ID and PROOF_OF_ADDRESS are VALIDATED', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: true, status: KYC_REVIEW.PENDING } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.REFUSED,
      },
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.VALIDATED,
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
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.DOCUMENTS_VALIDATED);
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
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as INCOMPLETE status if missing documents', () => {
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
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
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
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.REFUSED, USPerson: false } });
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
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
    expect(customer.properties.kyc?.documents?.ID?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
  });

  it('should be REFUSED if USPerson, W9 and PROOF_OF_ADDRESS are VALIDATED but ID is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.REFUSED, USPerson: true } });
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
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
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

  it('should be PENDING if USPerson, W9 is VALIDATED, ID and PROOF_OF_ADDRESS are PENDING', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.NONE, USPerson: true } });
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
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.INITIAL,
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
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.properties.kyc?.state).toEqual(IKycState.PENDING);
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
        status: IDocumentStatus.PENDING,
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

  it('should be REFUSED if not USPerson and ID is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { status: KYC_REVIEW.REFUSED, USPerson: false } });
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
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
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
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
    expect(customer.properties.kyc?.documents?.RESIDENCE_PROOF?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should allocate documents correctly for Residence Proof when order of documents is not chronological', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false, status: KYC_REVIEW.PENDING } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
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
    ]);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
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
        typeId: IDocumentType.PASSPORT,
        category: IDocumentCategory.ID,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
        statusCode: IDocumentStatusCode.VALIDATED,
      },
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
    expect(customer.properties.kyc?.state).toEqual(IKycState.DOCUMENTS_VALIDATED);
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
