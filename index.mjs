import { putItem, scanTable } from "./ddb.mjs";

const TABLE_NAME = "wf-test-daemons";

const messageId = (Math.random() + 1).toString(16).substring(2, 12);
const createdAt = Date.now();
const email = `${(Math.random() + 1).toString(36).substring(2, 12)}@example.com`;
const message = {
	messageId,
	createdAt,
	email,
};

const putResult = await putItem(TABLE_NAME, message);
if (putResult) console.log(`Successfully inserted: ${message}`);

console.log("Listing all records...");
const args = {
	ProjectionExpression: "createdAt, messageId, email",
};
const results = await scanTable(TABLE_NAME, args);
const rightNow = Date.now();
for (let result of results) {
	const timeAgo = (rightNow - result.createdAt) / 1000;
	console.log(`[${result.messageId}] ${result.email}\t\t(${timeAgo} seconds)`);
}
