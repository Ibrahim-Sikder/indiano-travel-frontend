// utils/s3Upload.ts
import AWS from "aws-sdk";

// Configure the AWS SDK with your credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const uploadFileToS3 = async (
  file: File
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `uploads/${file.name}`,
    Body: file,
    ACL: "public-read", // Adjust permissions as needed
  };

  return s3.upload(params).promise();
};
