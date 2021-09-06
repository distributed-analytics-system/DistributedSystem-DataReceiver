## Introduction

The DataReceiver microservice provides REST APIs. The APIs are being used by the DataSimulator. The responsibility of this microservice is to receive user behavioral data, specifically user clicks with timestamps and store them into data lake(S3).

## Architecture diagram of the whole system

![Architecture diagram](./docs/image/ArchDiagram.png)

## Sequence diagram of the whole system

![Sequence diagram](./docs/image/SequenceDiagram.png)

#### Datastores
1. Amazon S3 - This is the only data store that the service use. It saves user behavioral data into S3 for further processing by other services.


#### Environmental variables      
| ENV Variable | Description |
| ------------ | ----------- |
| NODE_ENV | Environment in which microservice will run. |
| PORT | The port where the service will be listening to |
| LOG_LEVEL | Log level |
| AWS_ACCESS_KEY_ID | AWS credential to access S3 |
| AWS_SECRET_ACCESS_KEY | AWS credential to access S3 |
| AWS_S3_BUCKET_NAME | The bucket name from S3 where the service will store events |

#### Run service locally
###### In order to run service, follow these simple steps:
    1. npm install
    2. Provide list of env variables in 'root/.env-dev' file with following format: envVar=value
    3. npm start


#### Maintainer contact
- vahagsaribeyan@gmail.com
