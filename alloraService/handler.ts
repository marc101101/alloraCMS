import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

export const getInfo: APIGatewayProxyHandler = async () => {
  let data = await getS3Data();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data, null, 2),
  };
}

export const postInfo: APIGatewayProxyHandler = async (event, _context) => {
  await postS3Data(event);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'Upload succeeded'
    }, null, 2),
  };
}

async function getS3Data() {
  var s3 = new AWS.S3();

  return new Promise(function (resolve, reject) {
    s3.getObject({ Bucket: process.env.JSON_BUCKET, Key: process.env.JSON_FILE }, function (error, data) {
      if (error != null) {
        reject(error);
      } else {
        resolve(JSON.parse(data.Body.toString()));
      }
    });
  });
}

async function postS3Data(result) {
  var s3 = new AWS.S3();
  console.log(JSON.stringify(result));


  let params = {
    Bucket: process.env.JSON_BUCKET, // pass your bucket name
    Key: process.env.JSON_FILE,
    Body: result.body,
  };

  await s3.putObject(params).promise();
}