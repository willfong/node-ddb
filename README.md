# POC: Node + DDB

Testing out using DDB and Node.

## Install

- `yarn add @aws-sdk/client-dynamodb`
- `yarn add @aws-sdk/lib-dynamodb`

## Example Output

Inserts a document (current date), and then reads/scans the entire table.

```
➜  node-ddb git:(main) ✗ yarn start
yarn run v1.22.19
$ node index.mjs
Successfully inserted: [object Object]
Listing all records...
[1a8982cb20] e6n33j0hu8@example.com             (74908.849 seconds)
[1e51b4bc29] 372qog9x74@example.com             (74900.827 seconds)
[89b5996f4d] pg3o8quf9h@example.com             (1.627 seconds)
[aa70e0f25d] 3ot4tt5rwj@example.com             (72214.465 seconds)
[0b0f4c39ca] r66a6cz5j4@example.com             (54734.633 seconds)

✨  Done in 2.05s.
➜  node-ddb git:(main) ✗
```
