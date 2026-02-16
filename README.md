# salesforce-flow-analyzer
A Browser Extension that analyzes Salesforce Flow XML Files for best practices, performance issues and common mistakes, providing developers with instant feedback. No data is collected, files are processed in browser locally only.


## Overview
A fully offline browser extension that analyzes Salesforce Flow XML files to identify common issues and best-practice violations before deployment. Implemented a rule-based analyzer covering 12 checks, including governor-limit risks, security misconfigurations, and frequent design mistakes in declarative automation. Designed for instant feedback with no external dependencies, helping developers and admins catch problems early and improve Flow reliability.

## Features
### Comprehensive Analysis
- **12 Analysis rule** covering critical to low priority issues
- **4 severity levels**: Critical,High,Medium,Low
- **6 categories**: Governer Limits, Security, Best Practices, Maintainability, Documentation, Performance.
- **Fully Offline Processing:** Your flow logic is never sent to any external application, and no data is collected. XML files are processed locally in your browser only.

### UI & Export Capabilities:
- Clean and simple UI.
- Exports the results to csv.

## Usage
- click on extension icon in Browser toolbar.
- Upload the salesforce XML File.
- Click on "Start Analysis" Button.
- Review the results and Download the results as CSV.
- You can also check all 12 rules details in Rules Book Tab.

## Installation:
-Edge Browser: https://microsoftedge.microsoft.com/addons/detail/kdaladfndjjgjlaflegomjnfpaipcfid
- Chrome Browser : https://chromewebstore.google.com/detail/salesforce-flow-analyzer/khebcjhnfkfggngggmpdlaefnmhkpnmi

## Rules:
| Name | Description | Category | Priority |
|------|-------------|----------|----------|
| Flow Has Description | Checks if flow has a description explaining its purpose | Documentation | Low |
| Elements Have Labels | Checks for generic default names like `Loop_1` etc | Maintainability | Low |
| Outdated API Version | Checks if flow uses an old Salesforce API version | Best Practices | Low |
| Variable Descriptions | Checks if variables have descriptions or not | Documentation | Low |
| Flow Complexity | Checks if Flow has too many elements (over 75) | Maintainability | Medium |
| Hardcoded Record IDs | Checks for hardcoded Salesforce IDs that break when deployed to other orgs | Security | Critical |
| SOQL in Loops | Checks if queries are inside loops | Governor Limits | Critical |
| DML in Loops | Checks if record operations are inside loops | Governor Limits | Critical |
| Missing Fault Paths | Checks if record operations have error handling configured | Best Practices | High |
| Missing Null Checks | Checks if flow verifies Get Records before using them | Best Practices | High |
| Formula Complexity | Checks for long or complex formulas (over 300 characters) | Maintainability | Low |
| Unused Variables | Checks for variables that are declared but never used | Best Practices | Low |

## Demo:
![Demo](demos/salesforce-flow-analyzer-demo.gif)

## Screenshots
Main Page:
<img width="1891" height="816" alt="image" src="https://github.com/user-attachments/assets/ac890501-2552-4941-bcdd-36c90993d934" />
Upload XML File:
<img width="1907" height="937" alt="image" src="https://github.com/user-attachments/assets/f1d9db46-eb21-4781-9671-482a75a73b2d" />
Analyze Tab:
<img width="1590" height="328" alt="image" src="https://github.com/user-attachments/assets/cf08c989-eef6-4bb1-89a8-a3baa0137247" />
Results:
<img width="1887" height="916" alt="image" src="https://github.com/user-attachments/assets/d63b91f1-fbc0-4d0e-a6ce-07b954d63b1c" />
Error When non-XML File is uploaded:
<img width="1907" height="688" alt="image" src="https://github.com/user-attachments/assets/5f9e4474-70f6-438e-839d-007ab7d0d9a6" />
Error when non-salesforce XML file is uploaded:
<img width="1835" height="622" alt="image" src="https://github.com/user-attachments/assets/e93b459e-8884-4baa-98df-c08d8d6f99b8" />
Download as CSV:
<img width="1913" height="829" alt="image" src="https://github.com/user-attachments/assets/ec647cea-f24a-4e82-9efa-f4535e92f134" />

## RoadMap:
**Current Version:1.0.0**
  - 12 Analysis rules.
  - CSV Export
  - XML Validations and Simple UI.


**Future Considerations:**
  - JSON Export Option
  - Multiple File Analysis
  - Custom Rule Configurations.

## License:
This project is licensed under the MIT License.


