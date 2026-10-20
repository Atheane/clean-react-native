import { IDocumentType, IDocumentCategory, IDocumentPage } from '../types';
import { CustomerError, DocumentError } from '../errors';

export class DocumentVO {
  private expectedPageCount: number;
  properties: {
    category: IDocumentCategory;
    type: IDocumentType;
    name: string;
  };
  recto?: string;
  verso?: string;
  constructor({ category, type, name }: { category: IDocumentCategory; type: IDocumentType; name: string }) {
    this.expectedPageCount = DocumentVO.computeExpectedPagesNumber(type);
    this.properties = {
      category,
      type,
      name,
    };
  }

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
  }

  public addRecto(page: string) {
    this.recto = page;
  }

  public addVerso(page: string) {
    if (!this.recto) {
      throw new DocumentError.MissingRecto();
    }
    this.verso = page;
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

  get isReady(): boolean {
    if (this.expectedPageCount === 2) {
      return !!this.recto && !!this.verso;
    }
    return !!this.recto;
  }
}
