import prisma from "@/lib/prisma";
import { Certificate } from "types/certificate";
import { apiPaths } from "@/lib/apiPaths";

export async function getUserCertificate(userId: string) {
  return await prisma.certificate.findMany({
    where: {
      userId,
    },
  });
}

async function updateOneCertificate(
  certificateId: number,
  certificateData: Certificate
) {
  return await prisma.certificate.update({
    where: {
      id: certificateId,
    },
    data: certificateData,
  });
}

export async function updateUserCertificate(newCertificateData: Certificate[]) {
  if (newCertificateData.length === 0) {
    throw new Error("No certificate data provided for update");
  }

  const updatedCertificate = await Promise.all(
    newCertificateData.map((each) => updateOneCertificate(each.id, each))
  );

  return updatedCertificate;
}

// client-side api call
export async function fetchAllUserCertificate(): Promise<
  Certificate[] | undefined
> {
  try {
    const res = await fetch(apiPaths.userCertificate());
    const data = await res.json();
    console.log("cert", data);
    return data.certificate;
  } catch (error) {
    console.error("Error fetching user certificate, ", error);
    return undefined;
  }
}
