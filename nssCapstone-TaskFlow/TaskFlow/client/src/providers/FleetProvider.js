import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";
export const FleetContext = React.createContext();

export const FleetProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [fleets, setFleets] = useState([]);

  const getAllFleets = () => {
    return getToken().then((token) =>
      fetch("/api/fleet", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setFleets)
    );
  };

  const getFleetById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/fleet/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addFleet = (fleet) => {
    return getToken().then((token) => {
      fetch(`/api/fleet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fleet),
      });
    });
  };

  const deleteFleet = (fleetId) =>
    getToken().then((token) =>
      fetch(`/api/fleet/${fleetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getAllFleets)
    );

  const updateFleet = (fleet) => {
    return getToken().then((token) =>
      fetch(`/api/fleet/${fleet.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fleet),
      })
    );
  };

  return (
    <FleetContext.Provider
      value={{
        fleets,
        getAllFleets,
        addFleet,
        deleteFleet,
        updateFleet,
        getFleetById,
      }}
    >
      {props.children}
    </FleetContext.Provider>
  );
};
