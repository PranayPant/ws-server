import AWS from 'aws-sdk'
import {Header, Request} from 'types/api.d'

const ddb = new AWS.DynamoDB()
const ssm = new AWS.SSM()


export default async (headers: Header) => {
    const {user_id, connection_id, api_key} = headers
    try{ 
        const {Parameter} = await ssm.getParameter({ Name: '/ws-api-demo/api/key', WithDecryption: true })
        .promise()
        if(Parameter?.Value !== api_key){
            throw new Error("Unauthorized")
        }
        await ddb.putItem({
            Item: {
                "UserId":{
                    S: user_id
                },
                "ConnectionId": {
                    S: connection_id
                }
            },
            TableName: 'UserConnections'
        }).promise()
        return true
    }
    catch(err){
        console.log('Error with connect api:', err)
        return false
    }
}