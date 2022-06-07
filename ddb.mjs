// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "ap-southeast-1";
const ddbClient = new DynamoDBClient({ region: REGION });

const marshallOptions = {
	// Whether to automatically convert empty strings, blobs, and sets to `null`.
	convertEmptyValues: false, // false, by default.
	// Whether to remove undefined values while marshalling.
	removeUndefinedValues: false, // false, by default.
	// Whether to convert typeof object to map attribute.
	convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
	// Whether to return numbers as a string instead of converting them to native JavaScript numbers.
	wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.WriteItem.html
export const putItem = async (TableName, Item) => {
	const params = { TableName, Item };
	try {
		const data = await ddbDocClient.send(new PutCommand(params));
		return data;
	} catch (err) {
		console.log("Error", err.stack);
	}
};

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.ReadItem.html
export const getItem = async (TableName, Key) => {
	const params = { TableName, Key };
	try {
		const data = await ddbDocClient.send(new GetCommand(params));
		return data.Item;
	} catch (err) {
		console.log("Error", err);
	}
};

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.DeleteItem.html
export const deleteItem = async (TableName, Key) => {
	const params = { TableName, Key };
	try {
		const data = await ddbDocClient.send(new DeleteCommand(params));
		return data;
	} catch (err) {
		console.log("Error", err);
	}
};

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Scan.html
export const scanTable = async (TableName, args) => {
	const params = {
		TableName,
		...args,
	};
	try {
		const data = await ddbDocClient.send(new ScanCommand(params));
		return data.Items;
	} catch (err) {
		console.log("Error", err);
	}
};
