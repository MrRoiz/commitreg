const rulesDefinition = {
	required : value=>!!value
}

function Validate(request,rules){
	Object.entries(rules).forEach(rule=>{
		let fieldToRule = rule[0]
		let askedRules = rule[1].split('|').forEach(askedRule=>{
			if(rulesDefinition[askedRule]){
				if(!rulesDefinition[askedRule](request[fieldToRule])){
					throw new Error(`Field ${fieldToRule} doesn't satisfy ${askedRule.toUpperCase()} rule`)
				}
			}else{
				throw new Error('Undefined Rule')
			}
		})

	})
}

module.exports = Validate