import { IsDateString, IsDefined, IsEnum, IsString } from 'class-validator';
import { IStepStatus, IDocumentStatusCode, IDocumentType, IStepTypes } from '../types';

export interface IDocumentProperties {
  typeId: IDocumentType;
  status: IStepStatus;
  statusCode: IDocumentStatusCode;
  createdAt: Date;
  context: IStepTypes;
  name: string;
}

export class DocumentVO {
  @IsEnum(IDocumentType)
  @IsDefined()
  typeId!: IDocumentType;

  @IsEnum(IStepStatus)
  @IsDefined()
  status!: IStepStatus;

  @IsEnum(IDocumentStatusCode)
  @IsDefined()
  statusCode!: IDocumentStatusCode;

  @IsDateString()
  @IsDefined()
  createdAt!: Date;

  @IsEnum(IStepTypes)
  @IsDefined()
  context!: IStepTypes;

  @IsString()
  @IsDefined()
  name!: string;

  private expectedPageCount: number;
  private recto?: string;
  private verso?: string;

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
  }

  constructor(props: IDocumentProperties) {
    Object.assign(this, props);
    this.expectedPageCount = DocumentVO.computeExpectedPagesNumber(props.typeId);
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
