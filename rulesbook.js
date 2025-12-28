export const rulesObjectMain={
	"RULE-001": {ruleId:"RULE-001",ruleName:"Flow Has Description",ruleExplaination:"Checks if flow has a description explaining its purpose", category:"Documentation", priority:"Low", successMessage:"Flow has Description", errorMessage:"Flow is missing a description", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=flowDataObject.hasDescription;
						return resObject;
					}
				},
	"RULE-002": {ruleId:"RULE-002",ruleName:"Elements Have Labels",ruleExplaination:"Checks for generic defaultnames like 'Loop_1' etc",  category:"Maintainability", priority:"Low", successMessage:"Elements doesn't have Generic Labels", errorMessage: `A Flow Element has Generic Labels`, executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject.availableElements.length>0){
							resObject['failedElements']=[];
							for(let elem in flowDataObject.availableElements){
								let val= flowDataObject.availableElements[elem];
								const regexExp= new RegExp(`^${val}[\\s_*.-]*\\d+$`);
								console.log(flowDataObject[`${val}`]);
								for(let sub in flowDataObject[`${val}`]){
									let actName=flowDataObject[`${val}`][sub].name;
									let res=regexExp.test(flowDataObject[`${val}`][sub].name);
									if(res){
										resObject['finalResult']=false;
										resObject.failedElements.push(`${val}- ${actName}`);
									}
						
								}
							}
						}
						return resObject;
					}
				},
	"RULE-003": {ruleId:"RULE-003",ruleName:"Outdated API Version",ruleExplaination:"Checks if flow uses an old Salesforce API version.",  category:"Best Practices", priority:"Low", successMessage: "Flow uses recent API Version only.", errorMessage: "Flow uses outdated API Version.", executeFunction: (flowDataObject)=>{
						let resObject={};
						const LATEST_API_VERSION = 64;
						let minAllowedVeriosn = LATEST_API_VERSION-5;
						resObject['finalResult'] = Number(flowDataObject.apiVersion)>minAllowedVeriosn;
						return resObject;
					}
				},
	"RULE-004": {ruleId:"RULE-004",ruleName:"Variable Descriptions",ruleExplaination:"Checks if variables have descriptions or not.",  category:"Documentation", priority:"Low", successMessage: "No variables without description were found.", errorMessage: "Found variables without Description", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.variables?.length>0){
							let varArray = flowDataObject.variables;
							resObject['failedElements']=[];
							for(let ind in varArray){
								let varObj= varArray[ind];
								if(!varObj?.description){
									resObject['finalResult'] = false;
									resObject.failedElements.push(varObj.name);
								}
								
							}
						}
						
						return resObject;
					}
				},
	"RULE-005": {ruleId:"RULE-005",ruleName:"Flow Complexity",ruleExplaination:"Checks if Flow has too many elements(over 75)",  category:"Maintainability", priority:"Medium", successMessage: "Flow is simple", errorMessage: "Found total number of elements are greater than 50, Flow is complex", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.totalElementsCount>75){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							resObject.failedElements.push(`Current Total Elements = ${flowDataObject?.totalElementsCount}`);
						}
						
						return resObject;
					}
				},
	"RULE-006": {ruleId:"RULE-006",ruleName:"Hardcoded Record IDs",ruleExplaination:"Checks for hardcoded Salesforce IDs that break when deployed to other orgs.",  category:"Security", priority:"Critical", successMessage: "Flow has no Hardcoded RecordIDs", errorMessage: "Found Hardcoded in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.hardCodedIdFound){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.hardCodedIdPaths){
									miniString+=`${flowDataObject.hardCodedIdPaths[ind]}; `;
							}
							resObject.failedElements.push(`The Hardcoded Ids found at following [${miniString}]`);
						}
						
						return resObject;
					}
				},
	"RULE-007": {ruleId:"RULE-007",ruleName:"SOQL in Loops",ruleExplaination:"Checks if queries are inside loops",  category:"Governer Limits", priority:"Critical", successMessage: "Flow has no getRecords Inside the loops", errorMessage: "Found getRecords inside a loop in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.isSOQLInsideLoop){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.soqlLoopNamesArray){
									miniString+=`${flowDataObject.soqlLoopNamesArray[ind]}; `;
							}
							resObject.failedElements.push(`The following getRecords [${miniString}] found inside loops`);
						}
						
						return resObject;
					}
				},
	"RULE-008": {ruleId:"RULE-008",ruleName:"DML in Loops",ruleExplaination:"Checks if Record operations are inside loops", category:"Governer Limits", priority:"Critical", successMessage: "Flow has no DML Opeartions Inside the loops", errorMessage: "Found DML Operation inside a loop in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.isDMLInsideLoop){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.dmlLoopNamesArray){
									miniString+=`${flowDataObject.dmlLoopNamesArray[ind]}; `;
							}
							resObject.failedElements.push(`The following getRecords [${miniString}] found inside loops`);
						}
						
						return resObject;
					}
				},
	"RULE-009": {ruleId:"RULE-009",ruleName:"Missing Fault Paths",ruleExplaination:"Checks If record operations have Error Handling configured", category:"Best Practices", priority:"High", successMessage: "No DML Operations without fault paths found", errorMessage: "Found DML Operation(s) without fault path.", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(!flowDataObject?.isFaultsPresentForAllDMLElements){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.dmlElementsWithoutFaults){
									miniString+=`${flowDataObject.dmlElementsWithoutFaults[ind]}; `;
							}
							resObject.failedElements.push(`The following DML Operations [${miniString}] found without fault paths`);
						}
						
						return resObject;
					}
				},
	"RULE-010": {ruleId:"RULE-010",ruleName:"Missing Null Checks",ruleExplaination:"Checks if flow verify get records before using them",  category:"Best Practices", priority:"High", successMessage: "No SOQL Opeartions without null checks are found", errorMessage: "Found SOQL Opeartions without null checks", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(!flowDataObject?.areAllNullChecksPresent){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.missinglookupReferences){
									miniString+=`${flowDataObject.missinglookupReferences[ind]}; `;
							}
							resObject.failedElements.push(`The following SOQL Operations [${miniString}] found without null checks`);
						}
						
						return resObject;
					}
				},
	"RULE-011": {ruleId:"RULE-011",ruleName:"Formula Complexity",ruleExplaination:"Checks for long or complex formulas(over 300 characters)", category:"Maintainability", priority:"Low", successMessage: "Formulas are not too complex", errorMessage: "Found complex formula(s)", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						let miniArray=[];
						resObject['failedElements']=[];
						flowDataObject?.formulas?.forEach(entry=>{
							if(entry?.expression?.length>300){
								resObject['finalResult'] = false;
								miniArray.push(entry.name);
							}
						});
						if(miniArray.length>0){
							let miniString='';
							miniArray.forEach(entry=>miniString+=`${entry}; `);
							resObject.failedElements.push(`The following formulaes aee complex [${miniString}]`);
						}
						
						return resObject;
					}
				},
	"RULE-012":	{ruleId:"RULE-012",ruleName:"Unused Variables",ruleExplaination:"Checks for variables that are declared but never used.", category:"Best Practices", priority:"Low", successMessage: "No unused Variables found", errorMessage: "Found unused variable(s)", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						resObject['failedElements']=[];
						if(flowDataObject['areUnusedVariablesFound']){
							resObject['finalResult']=false;
							let miniString='';
							flowDataObject.unusedVariablenames?.forEach(name=>{
								miniString+=`${name}; `;
							});
							resObject.failedElements.push(`The following unused variables [${miniString}] found.`);
						}				
						return resObject;
					}
				},		
};