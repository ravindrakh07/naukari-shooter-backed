import { Environment } from "./Env";

export const TestEnvironment: Environment = {
  port: Number(process.env.PORT),
  dbUrl: process.env.DB_URL_TEST,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  awsAccessKey: process.env.AWS_KEY_TEST,
  awsSecretKey: process.env.AWS_SECRET_TEST,
  s3Bucket: process.env.S3_BUCKET_TEST,
  s3AssetUrl: process.env.S3_ASSET_URL_TEST,
  awsRegion: process.env.AWS_REGION_TEST,
}