// OpenAI. (2023) 'Typescript Typings for Input', Available at: https://chat.openai.com/share/155386ed-fbf7-44eb-814d-852e6ec31e32 (Accessed: Nov 21, 2023).
type Description = {
    lang: string;
    value: string;
  };
  
  type CVSSDataV30 = {
    version: string;
    vectorString: string;
    attackVector: string;
    attackComplexity: string;
    privilegesRequired: string;
    userInteraction: string;
    scope: string;
    confidentialityImpact: string;
    integrityImpact: string;
    availabilityImpact: string;
    baseScore: number;
    baseSeverity: string;
  };
  
  type CVSSMetricV30 = {
    source: string;
    type: string;
    cvssData: CVSSDataV30;
    exploitabilityScore: number;
    impactScore: number;
  };
  
  type CVSSDataV2 = {
    version: string;
    vectorString: string;
    accessVector: string;
    accessComplexity: string;
    authentication: string;
    confidentialityImpact: string;
    integrityImpact: string;
    availabilityImpact: string;
    baseScore: number;
  };
  
  type CVSSMetricV2 = {
    source: string;
    type: string;
    cvssData: CVSSDataV2;
    baseSeverity: string;
    exploitabilityScore: number;
    impactScore: number;
    acInsufInfo: boolean;
    obtainAllPrivilege: boolean;
    obtainUserPrivilege: boolean;
    obtainOtherPrivilege: boolean;
  };
  
  type Metric = {
    cvssMetricV30?: CVSSMetricV30[];
    cvssMetricV2?: CVSSMetricV2[];
  };
  
  type Weakness = {
    source: string;
    type: string;
    description: Description[];
  };
  
  type CPEMatch = {
    vulnerable: boolean;
    criteria: string;
    matchCriteriaId: string;
  };
  
  type ConfigNode = {
    operator: string;
    negate: boolean;
    cpeMatch: CPEMatch[];
  };
  
  type Configuration = {
    nodes: ConfigNode[];
  };
  
  type Reference = {
    url: string;
    source: string;
  };
  
  type CVEParent = {
    cve: CVE;
  }

  type CVE = {
    id: string;
    sourceIdentifier: string;
    published: string;
    lastModified: string;
    vulnStatus: string;
    descriptions: Description[];
    metrics: Metric;
    weaknesses: Weakness[];
    configurations: Configuration[];
    references: Reference[];
  };
  
  export interface NVDResponse {
    resultsPerPage: number;
    startIndex: number;
    totalResults: number;
    format: string;
    version: string;
    timestamp: string;
    vulnerabilities: CVEParent[];
  };

  export interface Internal_NVD_API_Response {
    totalResults: number;
    allVulnerabilitites: CVEParent[];
    high: NVDResponse;
    critical: NVDResponse;
  }