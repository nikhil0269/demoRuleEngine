const grpc = require("grpc")
const  isCandidateAutoRejected  = require('./src/services/candidate_autorejection')

const protoLoader = require("@grpc/proto-loader")
const packageDefinition = protoLoader.loadSync(
    './ruleEngine.proto',
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    })
    
const proto = grpc.loadPackageDefinition(packageDefinition).candidate;

const URL = "0.0.0.0:8081"

async function getCandidateRejectionStatus (call, callback) {
    const status = await isCandidateAutoRejected({ gender: call.request.gender })
    if(!status) status = false
    .catch(error=>{ console.log(error) })
    console.log('status is ', status)
    callback(null, 
      {
         isRejected: status
      })
  }
function main(){
const server = new grpc.Server()
server.addService(proto.AutoRejectionService.service, { getCandidateRejectionStatus: getCandidateRejectionStatus })
server.bind(URL, grpc.ServerCredentials.createInsecure())
server.start()
}
main()
