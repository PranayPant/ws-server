import AWS from 'aws-sdk'
import {Request} from 'types/api.d'

const ddb = new AWS.DynamoDB()


export default async (request: Request) => {
    const {userId, connectionId} = request.header
    try{
        await ddb.putItem({
            Item: {
                "UserId":{
                    S: userId
                },
                "ConnectionId": {
                    S: connectionId
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