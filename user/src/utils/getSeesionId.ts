import { useEffect, useState } from "react";

import { http } from "./api";

export function getMachineId() {
  let machineId = localStorage.getItem("MachineId");
  let token = localStorage.getItem("token");

  const [userId, setUserId] = useState(null);
  const [truthlyToken, setTruthlyToken] = useState<boolean>(false);

  // MachineId is recreated if not found in localStorage
  if (!machineId) {
    machineId = crypto.randomUUID();
    localStorage.setItem("MachineId", machineId);
  }

  // Token checked for correct
  useEffect(() => {
    (async function () {
      const res = await http(true).get("/clients/profile/");
      if (res.status === 200) {
        setTruthlyToken(true);
        setUserId(res.data.id);
      }
    })();
  }, [token]);

  // If token is correct or has in localStorage return userId else machineId
  if (truthlyToken) {
    return userId;
  } else {
    return machineId;
  }
}
