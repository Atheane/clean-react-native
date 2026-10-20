import { IDocumentType, IDocumentProperties } from '../types';
import { DocumentError } from '../errors';

export class DocumentVO {
  expectedPageCount: number;
  properties: IDocumentProperties;
  recto?: string;
  verso?: string;
  isReady?: boolean;

  constructor(properties: IDocumentProperties) {
    this.expectedPageCount = DocumentVO.computeExpectedPagesNumber(properties.typeId);
    this.properties = properties;
    this.isReady = false;
  }

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
  }

  get value(): { recto: string; verso?: string } {
    if (!this.recto) throw new DocumentError.MissingRecto();
    if (this.expectedPageCount === 2 && !this.verso) throw new DocumentError.MissingVerso();
    if (this.expectedPageCount === 2) {
      return {
        recto: this.recto,
        verso: this.verso,
      };
    } else {
      return {
        recto: this.recto,
      };
    }
  }
}
