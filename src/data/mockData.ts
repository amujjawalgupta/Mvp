export interface UserEvent {
  id: string;
  timestamp: string;
  userId: string;
  device: string;
  activityType: 'Logon' | 'File' | 'USB' | 'Email' | 'Web' | 'Privilege';
  description: string;
  riskScore: number;
  severity: 'Low' | 'Medium' | 'High';
  category: 'Normal' | 'Malicious' | 'Negligent' | 'Compromised';
  isAnomaly: boolean;
  mitreTtp?: string;
  whyFlagged?: string[];
}

export const mockStats = {
  totalEventsProcessed: 1450230,
  totalAnomaliesDetected: 142,
  highRiskUsers: 18,
  falsePositiveRate: "1.2%",
  latency: "45ms",
};

export const mockEvents: UserEvent[] = [
  {
    id: "EV-9923",
    timestamp: "2026-10-10T02:14:22Z",
    userId: "JDOE (John Doe)",
    device: "PC-Unknown-992",
    activityType: "Logon",
    description: "Failed login attempt followed by successful login at unusual hours.",
    riskScore: 87,
    severity: "High",
    category: "Compromised",
    isAnomaly: true,
    mitreTtp: "T1078 - Valid Accounts",
    whyFlagged: [
      "Unusual login time (02:14 AM)",
      "New / unrecognized device (PC-Unknown-992)",
      "Deviation from learned behavioral baseline"
    ]
  },
  {
    id: "EV-9924",
    timestamp: "2026-10-10T08:30:00Z",
    userId: "ASMITH (Alice Smith)",
    device: "PC-CORP-102",
    activityType: "File",
    description: "Accessed standard project files.",
    riskScore: 12,
    severity: "Low",
    category: "Normal",
    isAnomaly: false
  },
  {
    id: "EV-9925",
    timestamp: "2026-10-09T18:45:11Z",
    userId: "BWAYNE (Bruce Wayne)",
    device: "PC-CORP-001",
    activityType: "USB",
    description: "Copied large volume of encrypted customer database files to unapproved USB drive.",
    riskScore: 95,
    severity: "High",
    category: "Malicious",
    isAnomaly: true,
    mitreTtp: "T1052 - Exfiltration Over Physical Medium",
    whyFlagged: [
      "Massive data transfer (50GB+)",
      "Unapproved external storage device",
      "Access to highly sensitive resource 'Customer_DB'"
    ]
  },
  {
    id: "EV-9926",
    timestamp: "2026-10-09T14:20:00Z",
    userId: "Ckent (Clark Kent)",
    device: "PC-CORP-404",
    activityType: "Email",
    description: "Emailed proprietary source code to a personal external email address.",
    riskScore: 78,
    severity: "High",
    category: "Negligent",
    isAnomaly: true,
    mitreTtp: "T1567 - Exfiltration Over Web Service",
    whyFlagged: [
      "Recipient domain is external (gmail.com)",
      "Attachment matches 'Confidential Source Code' DLP rule"
    ]
  },
  {
    id: "EV-9927",
    timestamp: "2026-10-09T11:05:30Z",
    userId: "PPARKER (Peter Parker)",
    device: "PC-CORP-221",
    activityType: "Privilege",
    description: "Attempted to elevate privileges without IT ticket.",
    riskScore: 65,
    severity: "Medium",
    category: "Malicious",
    isAnomaly: true,
    mitreTtp: "T1068 - Exploitation for Privilege Escalation",
    whyFlagged: [
      "Unauthorized sudo/admin attempt",
      "Outside standard change window"
    ]
  }
];

export const timelineData = [
  { time: '00:00', normal: 1200, anomaly: 2 },
  { time: '04:00', normal: 800, anomaly: 15 },
  { time: '08:00', normal: 5400, anomaly: 5 },
  { time: '12:00', normal: 7200, anomaly: 8 },
  { time: '16:00', normal: 6100, anomaly: 12 },
  { time: '20:00', normal: 2300, anomaly: 4 },
];
