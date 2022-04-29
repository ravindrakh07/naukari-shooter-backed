import { Environment } from "./Env";

export const ProdEnvironment: Environment = {
  port: Number(process.env.PORT),
  dbUrl: process.env.DB_URL_PROD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  awsAccessKey: process.env.AWS_KEY_PROD,
  awsSecretKey: process.env.AWS_SECRET_PROD,
  s3Bucket: process.env.S3_BUCKET_PROD,
  s3AssetUrl: process.env.S3_ASSET_URL_PROD,
  awsRegion: process.env.AWS_REGION_PROD,
}