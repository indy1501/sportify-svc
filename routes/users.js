const express = require('express');
const AWS = require('aws-sdk');
const router = new express.Router();
const uuid = require('uuidv4').default;

AWS.config.update({
    region: process.env.region,
    endpoint: process.env.endpoint,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

router.post('/:user_id/businesses', async (req, res) => {
    let business_id = uuid(), result_user_business, result_businesses;
    const user_business_params = {
        TableName: "user_business",
        Item: {
            "user_id": req.params.user_id,
            "business_id": business_id
        },
        ConditionExpression: "attribute_not_exists(user_id)"
    };
    const businesses_params = {
        TableName: "businesses",
        Item: {
            "business_id": business_id,
            "name": req.body.name,
            "categories": req.body.categories.join(),
            "address": req.body.address,
            "city": req.body.city,
            "state": req.body.state,
            "postal_code": req.body.postal_code
        },
        ConditionExpression: "attribute_not_exists(business_id)"
    };
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        result_user_business = await dynamodbDocClient.put(user_business_params).promise();
    } catch (err) {
        console.error("Unable to add user to user_business table", JSON.stringify(err));
        return res.status(500).json({error: "Unable to add user. User already has a associated business"});
    }
    try {
        result_businesses = await dynamodbDocClient.put(businesses_params).promise();
    } catch (err) {
        console.error("Unable to add business to businesses table", JSON.stringify(err));
        return res.status(500).json({error: "Unable to add business to businesses table"});
    }
    res.status(200).json({message: "Business created successfully"});
});

router.get('/:user_id/businesses', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const user_id = req.params.user_id;
    console.log("Fetching records based on userid", user_id);
    const user_business_params = {
        TableName: "user_business",
        KeyConditionExpression: "#user_id = :user_id",
        ExpressionAttributeNames: {
            '#user_id': 'user_id',
        },
        ExpressionAttributeValues: {
            ':user_id': user_id,
        },
    };
    let user_business_result;
    try {
        user_business_result = await dynamodbDocClient.query(user_business_params).promise();
        console.log("user_business query results :", user_business_result);
        if (user_business_result && user_business_result.Items && user_business_result.Items.length > 0) {
            const businesses_params = {
                TableName: "businesses",
                KeyConditionExpression: "#business_id = :business_id",
                ExpressionAttributeNames: {
                    '#business_id': 'business_id'
                },
                ExpressionAttributeValues: {
                    ':business_id': user_business_result.Items[0].business_id
                },
            };
            let businesses_result = await dynamodbDocClient.query(businesses_params).promise();
            if (businesses_result && businesses_result.Items && businesses_result.Items.length > 0) {
                console.log("Businesses Query results", businesses_result.Items[0]);
                return res.json(businesses_result.Items[0]);
            } else {
                return res.status(404).json({error: "Businesses not found"});
            }
        } else {
            return res.status(404).json({error: "User not found"});
        }
    } catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching business", error: err});
    }
})

module.exports = router;
