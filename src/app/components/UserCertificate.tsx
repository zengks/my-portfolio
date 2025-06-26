import { Certificate } from "types/certificate";

export default function UserCertificate({
  certificate,
}: {
  certificate: Certificate[] | undefined;
}) {
  return (
    <>
      Your Certificate
      {certificate ? (
        <div>
          {certificate.length === 0 && <div>No Certificate added.</div>}
          {certificate.length > 0 &&
            certificate.map((each: Certificate) => (
              <div key={each.id}>
                <p>-----------------------------------------------</p>
                <p>Cert ID: {each.id}</p>
                <p>User ID: {each.userId}</p>
                <p>Cert Name: {each.name}</p>
                <p>Cert Num: {each.certNumber}</p>
                <p>Date Issued: {each.dateIssued}</p>
                <p>Date Expired: {each.dateExpired}</p>
                <p>Created At: {each.createdAt}</p>
                <p>Updated At: {each.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your certificate...</div>
      )}
    </>
  );
}
