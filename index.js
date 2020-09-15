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
    console.log(call.request.gender)
    isCandidateAutoRejected(call.request.gender).then(r=>{
        
    })
    .catch(err=>{})
    callback(null, 
      {
         rejectionStatus: 'status'
      })
  }
function main(){
const server = new grpc.Server()
server.addService(proto.AutoRejectionService.service, { getCandidateRejectionStatus: getCandidateRejectionStatus })
server.bind(URL, grpc.ServerCredentials.createInsecure())
server.start()
}
main()
