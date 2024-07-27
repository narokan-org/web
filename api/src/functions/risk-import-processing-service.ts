import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import csv from "csv-parser";
import { RiskImportData } from "../models/risk-import-data";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

export async function riskImportProcessingService(
  blob: Buffer,
  context: InvocationContext
): Promise<void> {
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const blobName = context.triggerMetadata.name as string;

  const containerClient = blobServiceClient.getContainerClient("raw");
  const blobClient = containerClient.getBlobClient(blobName);

  const downloadBlockBlobResponse = await blobClient.download(0);
  const rawCSVData = await streamToBuffer(
    downloadBlockBlobResponse.readableStreamBody
  );

  const riskImportData: RiskImportData[] = await parseCSV(
    rawCSVData.toString()
  );

  console.log(riskImportData);
}

async function parseCSV(csvData: string): Promise<RiskImportData[]> {
  return new Promise((resolve, reject) => {
    const records: RiskImportData[] = [];
    const stream = require("stream");
    const csvStream = new stream.Readable();
    csvStream.push(csvData);
    csvStream.push(null);

    csvStream
      .pipe(csv())
      .on("data", (row) => {
        records.push({
          id: row["ID"],
          name: row["Name"],
          entity: row["Entity"],
          entityDescription: row["Entity Description"],
          riskDescription: row["Risk Description"],
          mitigationPlan: row["Mitigation Plan"],
          lastAssessment: new Date(row["Last Assessment"]),
          lastUpdated: new Date(row["Last updated"]),
          inherentRisk: row["Inherent Risk"],
          inherentRiskValue: parseFloat(row["Inherent Risk Value"]),
          controlStrength: parseFloat(row["Control Strength"]),
          residualRisk: row["Residual Risk"],
          residualRiskValue: parseFloat(row["Residual Risk Value"]),
          riskCategory: row["Risk Category"],
        });
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", reject);
  });
}

async function streamToBuffer(
  readableStream: NodeJS.ReadableStream
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

app.storageBlob("riskImportProcessingService", {
  path: "raw/{name}",
  connection: "AZURE_STORAGE_CONNECTION_STRING",
  handler: riskImportProcessingService,
});
