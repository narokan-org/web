import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

export async function riskImportService(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Get file from form data.
    const formData = await request.formData();
    const fileEntry = formData.get("risks-file");

    if (!fileEntry || !(fileEntry instanceof File)) {
      return {
        status: 400,
        body: "Invalid file upload.",
      };
    }

    const file = fileEntry as File;
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Setup Azure blob storage client and upload.
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.error("AZURE_STORAGE_CONNECTION_STRING is not set");

      return {
        status: 500,
        body: "File upload failed.",
      };
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    ); // TODO: Secure with Managed Identity.

    const containerClient = blobServiceClient.getContainerClient("raw");
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(fileBuffer);

    // TODO: The file should be sent to an Azure Storage queue. Other functions would process off this queue to actually process the files. For now, we'll simply process immediately and store into Cosmos DB.

    return {
      status: 200,
      body: "File uploaded successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      body: "Error processing file",
    };
  }
}

app.http("riskImportService", {
  methods: ["POST"],
  authLevel: "anonymous", // TODO: Secure all functions
  route: "uploads",
  handler: riskImportService,
});
