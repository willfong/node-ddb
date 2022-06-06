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

await putItem(TABLE_NAME, message);

const args = {
	ProjectionExpression: "createdAt, messageId, email",
};
await scanTable(TABLE_NAME, args);
