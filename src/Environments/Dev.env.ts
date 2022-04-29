import { Environment } from "./Env";

export const DevEnvironment: Environment = {
  port: Number(process.env.PORT),
  dbUrl: process.env.DB_URL_DEV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  awsAccessKey: process.env.AWS_KEY_DEV,
  awsSecretKey: process.env.AWS_SECRET_DEV,
  s3Bucket: process.env.S3_BUCKET_DEV,
  s3AssetUrl: process.env.S3_ASSET_URL_DEV,
  awsRegion: process.env.AWS_REGION_DEV,
}