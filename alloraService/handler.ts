import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const getInfo: APIGatewayProxyHandler = async () => {
  let data = await getS3Data();
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(data, null, 2),
  };
}

export const postInfo: APIGatewayProxyHandler = async (event, _context) => {
  await postS3Data(event);

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'Upload succeeded'
    }, null, 2),
  };
}

export const auth: APIGatewayProxyHandler = async (event, _context) => {
  try {
    let token = await authorize(event);

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        message: 'Auth succeeded',
        token: token
      }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }, null, 2),
    };
  }

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

  let params = {
    Bucket: process.env.JSON_BUCKET, // pass your bucket name
    Key: process.env.JSON_FILE,
    Body: result.body,
  };

  await s3.putObject(params).promise();
}

async function authorize(userData) {
  let user = JSON.parse(userData.body);

  let params: any = await getSSMParams();

  if (checkValidity(user, params.Parameters)) {
    return params.Parameters[0].Value;
  }
  else {
    throw "Unauthorized";
  }
}

async function getSSMParams() {
  let ssm = new AWS.SSM();

  var params = {
    Names: [ /* required */
      '/alloraCMS/spendenlike/user_mail',
      '/alloraCMS/spendenlike/user_password',
      '/alloraCMS/spendenlike/API_KEY'
      /* more items */
    ]
  };

  return new Promise(function (resolve, reject) {
    ssm.getParameters(params, function (error, data) {
      if (error != null) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}


function checkValidity(userData, params) {
  let paramsPassword = params[2].Value;
  let paramsMail = params[1].Value;

  if (paramsPassword.includes(userData.password) && paramsMail.includes(userData.mail)) {
    return true;
  }
  return false;
}