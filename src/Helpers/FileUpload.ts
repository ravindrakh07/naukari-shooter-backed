import * as fs from 'fs';
import { S3 } from 'aws-sdk';
import { env } from '../Environments/Env';

class FileUpload {
  constructor() {

  }

  static async uploadFileOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ) {
    try {
      const s3 = new S3({
        accessKeyId: env().awsRegion
      });
      const fileRemoteName = `${directory}/${fileName}`;
      console.log(fileRemoteName);
      return await s3.putObject({
        Bucket: env().s3Bucket,
        Body: fs.readFileSync(file.path),
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }


  static async removeFileFromS3(fileRemoteName) {
    try {
      const s3 = new S3({
        accessKeyId: env().awsAccessKey,
        secretAccessKey: env().awsAccessKey,
        region: env().awsRegion
      });
      // const params = {
      //   Bucket: getEnvironmentVariable().s3Bucket,
      //   Delete: {
      //     Objects: [{
      //       Key: fileRemoteName
      //     }]
      //   }
      // };

      console.log(fileRemoteName);
      const params = {
        Bucket: env().s3Bucket,
        Key: fileRemoteName
      }
      await s3.deleteObject(params);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async copyFilesOnS3(
    copySource: string,
    toDirectory: string
  ) {
    try {
      const s3 = new S3({
        accessKeyId: env().awsAccessKey,
        secretAccessKey: env().awsAccessKey,
        region: env().awsRegion
      });

      const params = {
        Bucket: env().s3Bucket,
        CopySource: copySource,
        Key: toDirectory
      }
      const newUrl = await s3.copyObject(params);
      return newUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  static async uploadBase64OnS3(
    base64,
    directory,
    fileName
  ) {
    try {
      const s3 = new S3({
        accessKeyId: env().awsAccessKey,
        secretAccessKey: env().awsAccessKey,
        region: env().awsRegion
      });

      const fileRemoteName = `${directory}/${fileName}`;
      console.log(fileRemoteName);

      // console.log(base64);
      // const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      // const buffer = Buffer.from(base64,'base64');
      const s3Object = {
        Bucket: env().s3Bucket,
        Body: base64,
        Key: fileRemoteName,
        // ContentEncoding: 'base64',
        ContentType: 'image/png',
        ACL: 'public-read'
      }
      let options = { partSize: 5 * 1024 * 1024, queueSize: 2 };
      return await s3.putObject(s3Object).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });

    } catch (error) {
      console.log(error);
      return '';
    }
  }

}

export default FileUpload;