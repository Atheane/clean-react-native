import { IDocumentType, IDocumentProperties } from '../types';

export class DocumentVO {
  properties: IDocumentProperties;
  private expectedPageCount: number;
  private recto?: string;
  private verso?: string;

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
  }

  constructor(properties: IDocumentProperties) {
    this.expectedPageCount = DocumentVO.computeExpectedPagesNumber(properties.typeId);
    this.properties = properties;
  }

  addPage(page: string) {
    if (this.expectedPageCount === 2 && !!this.recto) {
      this.verso = page;
    } else {
      this.recto = page;
    }
  }

  get isReady(): boolean {
    if (this.expectedPageCount === 2) {
      return !!this.recto && !!this.verso;
    }
    return !!this.recto;
  }

  get value(): { recto?: string; verso?: string } {
    return {
      recto: this.recto,
      verso: this.verso,
    };
  }
}
