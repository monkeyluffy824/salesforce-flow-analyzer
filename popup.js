import {rulesObjectMain} from './rulesbook.js'
console.log('Happy Flow!!!');
const submitFormTag = document.getElementById("uploadForm");
const fileInputTag = document.getElementById("fileInput");
const errorTag = document.getElementById("error");
const successTag =document.getElementById("success");
const analysisButtonTag= document.getElementById("startAnalysis");
const resultsContainerTag= document.getElementById("resultsContainer");
const allowedFileTypes =['text/xml'];
analysisButtonTag.addEventListener("click", ruleRunner);
let xmlText='';
const praser = new DOMParser();
let xmlDOM = undefined;
let flowNode = undefined;


let flowDataObject = {};
let isFlowParsedSuccessFully = false;

let rulesObject=rulesObjectMain; // There will be total of 12-15 rules, which will be Stored in local storage along with preferences.

function rulesExecutor(){
	console.log(rulesObject);
	let resultsObject=[];
	for(let rule of Object.values(rulesObject)){
		let resObject={};
		resObject['ruleId']=rule['ruleId'];
		resObject['result'] = rule.executeFunction(flowDataObject);
		resObject['category'] = rule.category;
		resObject['priority'] = rule.priority;
		if(resObject['result'].finalResult){
			resObject['successMessage']=rule.successMessage;
		}else{
			resObject['errorMessage']=rule.errorMessage;
		}
		
		resultsObject.push(resObject);
		
	}
	
	return resultsObject;
}

function ruleRunner(){
	let finalResultString='';
	resultsContainerTag.innerHTML ='';
	let results=rulesExecutor();
	console.log(results);
	for(let index in results){
		
		let res=results[index];
		let miniString=`${res.ruleId}-	${res.category}	${res.priority}	${res.result.finalResult}`;
		miniString = res.successMessage ? miniString+ `=>${res.successMessage}` : miniString+ `=>${res.errorMessage}`;
		console.log(res.failedElements);
		if(res.result?.failedElements?.length>0){
			let subString ='';
			for(let fal of res.result?.failedElements){
				subString=subString.length>0 ? subString+` , ${fal}` : `${fal}`
			}
			miniString+=`,Failed Due to thse elements [${subString}]`;
		}
		finalResultString+=miniString+'<br>';
		
	}
	
	resultsContainerTag.innerHTML =finalResultString;
}


submitFormTag.addEventListener("submit", (e)=>{
	e.preventDefault();
	errorTag.textContent='';
	successTag.textContent='';
	resultsContainerTag.innerHTML ='';
	isFlowParsedSuccessFully=false;
	analysisButtonTag.style.display="none";
	 if(fileInputTag.files.length===0){
		 errorTag.textContent='Please select a file to submit';
		 return;
	 }
	 
	 const file= fileInputTag.files[0];
	 console.log(file.type);
	 if(!allowedFileTypes.includes(file.type)){
		errorTag.textContent='Only xml files are allowed to analyze';
		 return; 
	 }
	 
	 const reader = new FileReader();
	 reader.readAsText(file);
	 reader.onload = function (){
		flowDataObject = {};
		flowDataObject['availableElements']=[];
		xmlText= reader.result;
		//console.log(xmlText);
		xmlDOM = praser.parseFromString(xmlText,'text/xml');
		if(xmlDOM.children[0].nodeName=='Flow'){
			flowNode = xmlDOM.children[0];
			let children = flowNode.children;
			let processMetadata={};
			for(let child of children){
				if(child.nodeName=='label'){
					flowDataObject['flowName'] = child.textContent;
				}else if(child.nodeName=='apiVersion'){
					flowDataObject['apiVersion'] = child.textContent;
				}else if(child.nodeName=='description'){
					flowDataObject['description'] = child.textContent;
				}else if(child.nodeName=='variables'){
					if(!flowDataObject.availableElements.includes('variables')){
						flowDataObject.availableElements.push('variables');
					}
					let varDataObject={};
					let varChildren=child.children;
					for(let varChild of varChildren){
						if(varChild.nodeName=='name'){
							varDataObject['name']=varChild.textContent;
						}else if(varChild.nodeName=='dataType'){
							varDataObject['dataType']= varChild.textContent;
						}else if(varChild.nodeName=='isCollection'){
							varDataObject['isCollection']= varChild.textContent;
						}else if(varChild.nodeName=='isInput'){
							varDataObject['isInput']= varChild.textContent;
						}else if(varChild.nodeName=='isOutput'){
							varDataObject['isOutput']= varChild.textContent;
						}else if(varChild.nodeName=='objectType'){
							varDataObject['objectType']= varChild.textContent;
						}else if(varChild.nodeName=='value'){
							varDataObject['defaultValue']= varChild.textContent;
						}else if(varChild.nodeName=='scale'){
							varDataObject['decimalPlace']= varChild.textContent;
						}
					}
					if(!Array.isArray(flowDataObject.variables)){
						flowDataObject['variables']=[];
					}
					flowDataObject.variables.push(varDataObject);
				}else if(child.nodeName=='formulas'){
					if(!flowDataObject.availableElements.includes('formulas')){
						flowDataObject.availableElements.push('formulas');
					}
					let formulaDataObject={};
					let formulaChildren= child.children;
					for(let formulaChild of formulaChildren){
						if(formulaChild.nodeName=='name'){
							formulaDataObject['name']=formulaChild.textContent;
						}else if(formulaChild.nodeName=='dataType'){
							formulaDataObject['dataType']=formulaChild.textContent;
						}else if(formulaChild.nodeName=='expression'){
							formulaDataObject['expression']=formulaChild.textContent;
						}else if(formulaChild.nodeName=='scale'){
							formulaDataObject['scale']=formulaChild.textContent;
						}
					}
					if(!Array.isArray(flowDataObject.formulas)){
						flowDataObject['formulas']=[];
					}
					flowDataObject.formulas.push(formulaDataObject);
				}else if(child.nodeName=='loops'){
					if(!flowDataObject.availableElements.includes('loops')){
						flowDataObject.availableElements.push('loops');
					}
					let loopDataObject={};
					let loopChildren= child.children;
					for(let loopChild of loopChildren){
						if(loopChild.nodeName=='label'){
							loopDataObject['name']=loopChild.textContent;
						}else if(loopChild.nodeName=='collectionReference'){
							loopDataObject['collectionReference']=loopChild.textContent;
						}else if(loopChild.nodeName=='iterationOrder'){
							loopDataObject['iterationOrder']=loopChild.textContent;
						}
					}
					if(!Array.isArray(loopDataObject.loops)){
						flowDataObject['loops']=[];
					}
					flowDataObject.loops.push(loopDataObject);
				}else if(child.nodeName=='processType'){
					flowDataObject['type']=child.textContent;
				}else if(child.nodeName=='processMetadataValues'){
					let pmvChildren= child.children;
					let val='';
					for(let pmvChild of pmvChildren){
						if(pmvChild.nodeName=='name'){
							processMetadata[`${pmvChild.textContent}`]='';
							val=pmvChild.textContent;
						}else if(pmvChild.nodeName=='value'){
							for(let str of pmvChild.children){
								if(str.nodeName=='stringValue'){
									processMetadata[val]= str.textContent;
								}
							}
						}
					}
				}
			}
			flowDataObject['processMetaData']=processMetadata;
			if(flowDataObject.description){
				flowDataObject['hasDescription'] =true;
			}else{
				flowDataObject['hasDescription'] = false;
			}
			console.log(flowDataObject);
			isFlowParsedSuccessFully = true;
			successTag.textContent='Flow parsed successfully,to start analysis please click on Start Analysis Button.'
		}
		console.log(isFlowParsedSuccessFully,analysisButtonTag.style.display);
		analysisButtonTag.style.display = isFlowParsedSuccessFully ? "inline-block" : "none";
		
	 }
	 
});