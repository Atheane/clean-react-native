import { IDocumentCategory, IDocumentStatus, IDocumentType } from '../types';
import { Customer } from '../entities';

describe('Customer - unit', () => {
  it('should create a Customer with init status and provided id', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'INIT' } });
    expect(customer.properties.status).toEqual('INIT');
    expect(customer.id).toEqual('1');
  });

  it('should create a Customer with provided status', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'CANCELED' } });
    expect(customer.properties.status).toEqual('CANCELED');
  });
  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if ID and TAX_CERTIFICATE as W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'INIT' } });
    customer.addDocuments([
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
    expect(customer.properties.documents?.residenceProof).toBeUndefined();
    expect(customer.properties.documents?.secondId).toBeUndefined();
    expect(customer.properties.documents?.portrait).toBeUndefined();
    expect(customer.properties.documents?.w9?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.w9?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.firstId?.pagesNumber).toEqual(2);
    expect(customer.properties.documents?.firstId?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.firstId?.versoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        category: IDocumentCategory.FIRST_ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
  });

  it('should set customer as PENDING status and compute unique list of documents by typeId and pageNumber if TAX_CERTIFICATE as RESIDENCE_PROOF', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'INIT' } });
    customer.addDocuments([
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
    expect(customer.properties.documents?.w9).toBeUndefined();
    expect(customer.properties.documents?.firstId).toBeUndefined();
    expect(customer.properties.documents?.secondId).toBeUndefined();
    expect(customer.properties.documents?.portrait).toBeUndefined();
    expect(customer.properties.documents?.residenceProof?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.residenceProof?.versoProps).toBeUndefined();
  });

  it('should set customer as REFUSED if verso ID is REFUSED', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'REFUSED' } });
    customer.addDocuments([
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
      {
        typeId: IDocumentType.LIVENESS,
        category: IDocumentCategory.PORTRAIT,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.documents?.w9).toBeUndefined();
    expect(customer.properties.documents?.residenceProof).toBeUndefined();
    expect(customer.properties.documents?.firstId?.pagesNumber).toEqual(2);
    expect(customer.properties.documents?.firstId?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.firstId?.versoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.secondId?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PASSPORT,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.secondId?.versoProps).toBeUndefined();
    expect(customer.properties.documents?.portrait?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.portrait?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.LIVENESS,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
  });

  it('should allocate documents correctly if W9', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'PENDING' } });
    customer.addDocuments([
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
      {
        typeId: IDocumentType.LIVENESS,
        category: IDocumentCategory.PORTRAIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-01T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.LIVENESS,
        category: IDocumentCategory.PORTRAIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
        createdAt: new Date('2023-10-02T13:20:21.303Z'),
      },
      {
        typeId: IDocumentType.LIVENESS,
        category: IDocumentCategory.PORTRAIT,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
        createdAt: new Date('2023-10-03T13:20:21.303Z'),
      },
    ]);
    customer.checkCustomerStatus();
    expect(customer.properties.status).toEqual('REFUSED');
    expect(customer.properties.documents?.w9?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.w9?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.w9?.versoProps).toBeUndefined();
    expect(customer.properties.documents?.w9?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.firstId?.pagesNumber).toEqual(2);
    expect(customer.properties.documents?.firstId?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.firstId?.versoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.secondId?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.secondId?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.HEALTH_INSURANCE_CARD,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.secondId?.versoProps).toBeUndefined();
    expect(customer.properties.documents?.residenceProof?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.residenceProof?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.PROOF_OF_ADDRESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.residenceProof?.versoProps).toBeUndefined();
    expect(customer.properties.documents?.portrait?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.portrait?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.LIVENESS,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
  });

  it('should allocate documents correctly for Residence Proof', () => {
    const customer = Customer.Create({ id: 1, properties: { status: 'INIT' } });
    customer.addDocuments([
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
    expect(customer.properties.documents?.w9).toBeUndefined();
    expect(customer.properties.documents?.firstId).toBeUndefined();
    expect(customer.properties.documents?.secondId).toBeUndefined();
    expect(customer.properties.documents?.portrait).toBeUndefined();
    expect(customer.properties.documents?.residenceProof?.pagesNumber).toEqual(1);
    expect(customer.properties.documents?.residenceProof?.rectoProps).toEqual(
      expect.objectContaining({
        typeId: IDocumentType.INVOICE,
        category: IDocumentCategory.RESIDENCE_PROOF,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    );
    expect(customer.properties.documents?.residenceProof?.versoProps).toBeUndefined();
  });
});
