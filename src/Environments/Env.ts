import { DevEnvironment } from "./Dev.env";
import { ProdEnvironment } from "./Prod.env";
import { TestEnvironment } from "./Test.env";

export interface Environment {
  port: number;
  dbUrl: string;
  jwtSecret?: string;
  jwtExpiresIn?: string;
  awsAccessKey?: string;
  awsSecretKey?: string;
  s3Bucket?: string;
  s3AssetUrl?: string;
  awsRegion?: string;
  slackToken?: string;
}

export function env(): Environment {
  if (process.env.NODE_ENV === 'prod') {
    return ProdEnvironment;
  }

  if (process.env.NODE_ENV === 'test') {
    return TestEnvironment;
  }

  return DevEnvironment;

}
