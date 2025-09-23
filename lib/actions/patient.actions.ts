"use server";
import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  IDENTIFICATION_DOCUMENT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
//import { IdentificationTypes } from "@/constants";



// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Register User", { ...user, password: "[REDACTED]" });
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      user.password,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
    if (error?.code === 409) {
      try {
        const existingUsers = await users.list([
          Query.equal("email", [user.email]),
        ]);
        if (existingUsers.users.length > 0) {
          const existingUser = existingUsers.users[0];
          console.log("User already exists:", existingUser);
          return parseStringify(existingUser);
        } else {
          console.error("User conflict but no existing user found");
          console.log("User conflict but no existing user found");
        }
      } catch (listError: any) {
        console.error("Error listing existing users:", listError);
        console.log(`Failed to verify existing user: ${listError.message}`);
      }
    }
    if (error.code === 400) {
      console.log(`Invalid user data: ${error.message}`);
    }
    throw error;
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.error("An error occurred while retrieving the user details:", error);
    if (error.code === 404) {
      console.log(`User not found: ${userId}`);
    }
    throw error;
  }
};

// REGISTER PATIENT ID (IDENTIFICATION DOCUMENT)
export const registerPatientID = async ({
  identificationDocument,
  ...identificationDocumentParams
}: RegisterUserDocParams) => {
  console.log("...identificationDocumentParams", identificationDocumentParams);
  try {
    let file;
    if (identificationDocument) {
      console.log("identificationDocument", identificationDocument);
      const inputFile = InputFile.fromBlob(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      IDENTIFICATION_DOCUMENT!,
      ID.unique(),
      {
        userId: identificationDocumentParams.userId,
        identificationType: identificationDocumentParams.identificationType || null,
        identificationNumber: identificationDocumentParams.identificationNumber || null,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
      }
    );
    console.log("{Document newPatient}", { newPatient });
    return parseStringify(newPatient);
  } catch (error: any) {
    console.error("An error occurred while creating a new patient ID:", error);
    console.log(`Failed to register patient ID: ${error.message}`);
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  ...patient
}: RegisterUserParams) => {
   console.log("{newPatient}",  patient);
   const { password, ...patientDataWithoutPassword } = patient;
  try {
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patientDataWithoutPassword,
      }
    );
   
    return parseStringify(newPatient);
  } catch (error: any) {
    console.error("An error occurred while creating a new patient:", error);
    console.log(`Failed to register patient: ${error.message}`);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    if (patients.documents.length === 0) {
      console.log(`No patient found for userId: ${userId}`);
      return null;
    }
    return parseStringify(patients.documents[0]);
  } catch (error: any) {
    console.error("An error occurred while retrieving the patient details:", error);
    console.log(`Failed to retrieve patient: ${error.message}`);
  }
};