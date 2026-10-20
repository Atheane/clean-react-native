import { IDocumentCategory, IDocumentStatus, IDocumentType } from '../types';
import { Customer } from '../entities';

describe('Customer - unit', () => {
  it('should create a Customer with init status and provided id', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false } });
    expect(customer.properties.status).toEqual('PENDING');
    expect(customer.id).toEqual('1');
  });

  it('should create a Customer with provided status', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'CANCELED', USPerson: false } });
    expect(customer.properties.status).toEqual('CANCELED');
  });

  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if ID and TAX_CERTIFICATE as W9', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: true } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents.w9?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents.firstId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if TAX_CERTIFICATE as RESIDENCE_PROOF', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('PENDING');
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents.residenceProof?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as REFUSED if verso ID is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'REFUSED', USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PASSPORT,
        category: IDocumentCategory.SECOND_ID,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents?.firstId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.secondId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PASSPORT,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });

  it('should be complete if USPerson and  W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'PENDING', USPerson: true } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        category: IDocumentCategory.SECOND_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        category: IDocumentCategory.SECOND_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-02T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.kyc?.isComplete).toEqual(true);
    expect(customer.properties.kyc?.documents?.w9?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.firstId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.secondId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.residenceProof?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should be complete if not USPerson and  not W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'PENDING', USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.RESIDENT_PERMIT,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        category: IDocumentCategory.SECOND_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        category: IDocumentCategory.SECOND_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-02T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.kyc?.isComplete).toEqual(true);
    expect(customer.properties.kyc?.documents?.firstId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.secondId?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.kyc?.documents?.residenceProof?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should allocate documents correctly for Residence Proof', () => {
    const customer = Customer.Create({ id: 1, properties: { USPerson: false } });
    customer.checkDocumentsStatus([
      {
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('PENDING');
    expect(customer.properties.kyc?.isComplete).toEqual(false);
    expect(customer.properties.kyc?.documents?.residenceProof?.properties).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });
});
