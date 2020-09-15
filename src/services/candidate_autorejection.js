const { Engine } = require('json-rules-engine') 
let engine = new Engine()

const isCandidateAutoRejected = async candidate => {
const rule = ({
    conditions: {
        all: [{
            fact: candidate,
            operator: 'equal',
            value: 'male',
            path: '.gender'
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
    gender: candidate.gender
}

engine.run(facts).then(results => {
    results.events.map(event => {
        console.log(event.params.message)
        return true
    })
}).catch(err => {
    console.log(err)
    return false
})
// const result = await engine.run(facts)
//   console.log(result.events)
//   return result.events
}
module.exports = isCandidateAutoRejected