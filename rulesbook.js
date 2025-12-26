export const rulesObjectMain={
	"RULE-001": {ruleId:"RULE-001", category:"Documentation", priority:"Low", successMessage:"Flow has Description", errorMessage:"Flow is missing a description", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=flowDataObject.hasDescription;
						return resObject;
					}
				},
	"RULE-002": {ruleId:"RULE-002", category:"Maintainability", priority:"Low", successMessage:"Elements doesn't have Generic Labels", errorMessage: `A Flow Element has Generic Labels`, executeFunction: (flowDataObject)=>{
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
	"RULE-003": {ruleId:"RULE-003", category:"Best Practices", priority:"Low", successMessage: "Flow uses recent API Version only.", errorMessage: "Flow uses outdated API Version.", executeFunction: (flowDataObject)=>{
						let resObject={};
						const LATEST_API_VERSION = 64;
						let minAllowedVeriosn = LATEST_API_VERSION-5;
						resObject['finalResult'] = Number(flowDataObject.apiVersion)>minAllowedVeriosn;
						return resObject;
					}
				},
	"RULE-004": {ruleId:"RULE-004", category:"Documentation", priority:"Low", successMessage: "No variables without description were found.", errorMessage: "Found variables without Description", executeFunction: (flowDataObject)=>{
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
	"RULE-005": {ruleId:"RULE-005", category:"Maintainability", priority:"Medium", successMessage: "Flow is simple", errorMessage: "Found total number of elements are greater than 50, Flow is complex", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.totalElementsCount>50){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							resObject.failedElements.push(`Current Total Elements = ${flowDataObject?.totalElementsCount}`);
						}
						
						return resObject;
					}
				},
	"RULE-006": {ruleId:"RULE-006", category:"Security", priority:"Critical", successMessage: "Flow has no Hardcoded RecordIDs", errorMessage: "Found Hardcoded in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.hardCodedIdFound){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.hardCodedIdPaths){
									miniString+=`${flowDataObject.hardCodedIdPaths[ind]}, `;
							}
							resObject.failedElements.push(`The Hardcoded Ids found at following [${miniString}]`);
						}
						
						return resObject;
					}
				},
	"RULE-007": {ruleId:"RULE-007", category:"Governer Limits", priority:"Critical", successMessage: "Flow has no getRecords Inside the loops", errorMessage: "Found getRecords inside a loop in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.isSOQLInsideLoop){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.soqlLoopNamesArray){
									miniString+=`${flowDataObject.soqlLoopNamesArray[ind]}, `;
							}
							resObject.failedElements.push(`The following getRecords [${miniString}] found inside loops`);
						}
						
						return resObject;
					}
				},
	"RULE-008": {ruleId:"RULE-008", category:"Governer Limits", priority:"Critical", successMessage: "Flow has no DML Opeartions Inside the loops", errorMessage: "Found DML Operation inside a loop in the flow", executeFunction: (flowDataObject)=>{
						let resObject={};
						resObject['finalResult']=true;
						if(flowDataObject?.isDMLInsideLoop){
							resObject['failedElements']=[];
							resObject['finalResult']=false;
							let miniString='';
							for(let ind in flowDataObject.dmlLoopNamesArray){
									miniString+=`${flowDataObject.dmlLoopNamesArray[ind]}, `;
							}
							resObject.failedElements.push(`The following getRecords [${miniString}] found inside loops`);
						}
						
						return resObject;
					}
				},
};