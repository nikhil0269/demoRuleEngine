const logger = require('../../logger')
const { Engine } = require('json-rules-engine') 
let engine = new Engine()

const runSingleRuleEngine = async (engineInstance, fact) => new Promise((resolve, reject) => {
    engineInstance.once('success', (event, almanac, ruleResult) => resolve({ event, almanac, ruleResult }))
    engineInstance.once('failure', (event, almanac, ruleResult) => reject(new Error({ event, almanac, ruleResult })))
    fact ? engineInstance.run(fact) : engineInstance.run()
  })

const isCandidateAutoRejected = async ({ gender }) => {
const rule = ({
    conditions: {
        all: [{
            fact: 'gender',
            operator: 'equal',
            value: 'male',
        }]
    },
    event: {
        type: 'auto-rejected',
        params: {
            message: 'Candidate is auto-rejected'
        }
    }
})
engine.addRule(rule)
const facts = {
    gender: gender
}
console.log(facts)

// engine.run(facts).then(results => {
//     console.log(results)
//     results.events.map(event => {
//         return true
//     })
// }).catch(err => {
//     console.log(err)
//     return false
// })

const res = await runSingleRuleEngine(engine, facts)
// .then(res =>{
//     logger.info(`rule evaluated to: ${res.ruleResult.result}`)
//     return res.ruleResult.result
// })
.catch(error => {
    logger.error(`rule failed with error:  ${error}`)
  })
return res?.ruleResult?.result
}

module.exports = isCandidateAutoRejected