export type PageId =
  | 'landing'
  | 'dashboard'
  | 'analyze'
  | 'intelligence'
  | 'evidence'
  | 'conflicts'
  | 'trust'
  | 'products'
  | 'exports'
  | 'settings';

export type ConflictStatus = 'detected' | 'resolved' | 'none';
export type ProductStatus = 'CONFLICT_DETECTED' | 'READY_FOR_CATALOG' | 'NEEDS_REVIEW' | 'PROCESSING';

export interface SourceEvidence {
  sourceId: string;
  sourceType: 'website' | 'catalog' | 'datasheet' | 'erp' | 'manual';
  sourceName: string;
  sourceUri: string;
  timestamp: string;
  extractedValue: string;
  confidence: number; // 0 - 100
  snippet: string;
  pageOrSection?: string;
  reliabilityScore: number; // 0 - 100 (e.g. Datasheet = 95%, Catalog = 90%, Website = 85%)
}

export interface AttributeConflict {
  id: string;
  attributeKey: string;
  attributeName: string;
  detectedAt: string;
  severity: 'high' | 'medium' | 'low';
  conflictingValues: {
    value: string;
    sourceType: string;
    sourceName: string;
    evidenceId: string;
    confidence: number;
    recommended?: boolean;
    reasoning?: string;
  }[];
  isResolved: boolean;
  resolvedValue?: string;
  resolutionReason?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface ProductAttribute {
  key: string;
  name: string;
  value: string | null;
  unit?: string;
  isMissing: boolean;
  isConflicted: boolean;
  conflictId?: string;
  confidence: number; // 0 - 100
  category: 'electrical' | 'mechanical' | 'environmental' | 'physical' | 'compliance' | 'general';
  sources: SourceEvidence[];
  suggestedValue?: string;
  suggestedReason?: string;
  standardNormalizedKey?: string;
}

export interface TrustScoreBreakdown {
  overall: number; // 0 - 100
  completeness: number; // 0 - 100 (% of required schema fields populated)
  consistency: number; // 0 - 100 (% of cross-source assertions without conflict)
  sourceQuality: number; // 0 - 100 (weighted average of document provenance reliability)
  extractionConfidence: number; // 0 - 100 (OCR / NER confidence model certainty)
  formulaExplanation: string;
}

export interface RawSourceDocument {
  id: string;
  type: 'website' | 'catalog' | 'datasheet';
  title: string;
  fileNameOrUrl: string;
  uploadDate: string;
  contentSnippet: string;
  reliabilityWeight: number; // 0 - 1.0
  attributeCountExtracted: number;
}

export interface ProductItem {
  id: string;
  name: string;
  modelNumber: string;
  sku: string;
  category: string;
  manufacturer: string;
  status: ProductStatus;
  trustScore: TrustScoreBreakdown;
  attributes: Record<string, ProductAttribute>;
  conflicts: AttributeConflict[];
  rawSources: RawSourceDocument[];
  lastUpdated: string;
  catalogCategoryPath: string[];
  complianceStandards: string[];
  auditHistory: {
    id: string;
    timestamp: string;
    action: string;
    user: string;
    details: string;
  }[];
}

export interface TrustWeights {
  completenessWeight: number; // e.g. 0.30
  consistencyWeight: number; // e.g. 0.35
  sourceQualityWeight: number; // e.g. 0.20
  confidenceWeight: number; // e.g. 0.15
}
