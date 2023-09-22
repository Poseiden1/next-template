import { User } from "next-auth";

import { ILdapUser } from "@/types/api";

const ldap = require("ldapjs");

export function Bind(credentials: Record<"password" | "username", string>) {
  const client = ldap.createClient({
    url: ["ldap://" + "ldapk5.tu-bs.de" + ":" + 389],
  });

  client.on("error", (err: Error) => {
    return null;
  });

  let dn = "ou=people,dc=tu-bs,dc=de";

  return new Promise((resolve, reject) => {
    client.bind(
      "uid=" + credentials.username + "," + dn,
      credentials.password,
      (error: Error) => {
        if (error) {
          resolve(null);
        } else {
          console.log("Logged in");
          const user: User = {
            id: credentials.username,
          };

          resolve(user);
        }
      }
    );
  });
}

export function GetUserById(userId: string) {
  const client = ldap.createClient({
    url: ["ldap://" + "ldapk5.tu-bs.de" + ":" + 389],
  });

  client.on("error", (err: Error) => {
    console.log(err);
    return null;
  });

  let dn = "ou=people,dc=tu-bs,dc=de";
  let options = {
    scope: "one",
    filter: `(uid=${userId})`,
    attributes: ["uid", "givenName", "sn", "mail", "ou"],
    page: true,
    sizeLimit: 500,
  };

  return new Promise((resolve, reject) => {
    client.search(dn, options, (err: Error, res: any) => {
      if (err) console.log(err);
      let user: ILdapUser | null = null;
      res.on("searchEntry", (entry: any) => {
        user = {
          id: entry.attributes[0].values[0],
          email: entry.attributes[1].values[0],
          firstname: entry.attributes[3].values[0],
          lastname: entry.attributes[4].values[0],

          // department: entry.attributes[2].values[0],
        };
      });

      res.on("end", (result: any) => {
        resolve(user);
      });
    });
  });
}
