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
				}
};