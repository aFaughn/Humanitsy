import os
import boto3
import botocore
import uuid

# This file is where the main guts of S3 integration live. Below are some useful methods
# for making sure things run smoothly on the AWS side of things.

# Grab our keys from the data defined in .env
# For a detailed guide on setting up S3 in Flask, go to https://hackmd.io/4yEAJpBXSWCZmI16J5ID1Q
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png","jpg","jpeg","gif"}

#Tell boto3 where our keys are
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
    # If filename contains a '.' as well as a '\'
    # split the filename by it's extension, force it lowercase, and check the extension against our list of allowed types.
    return "." in filename and \
        filename.rsplit(".",1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    # Split the extension from the name
    # Create a unique name using UUID
    # return the unique name generated by UUID and glue the extension back on.
    # It's important to make sure you are creating unique filenames for AWS because otherwise files with the same name
    # will overwrite eachother. Which -could potentially- piss some users off.
    ext = filename.rsplit(".",1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        #in case our s3 upload fails
        return {"errors": str(e)}

    return {"url":f"{S3_LOCATION}{file.filename}"}
