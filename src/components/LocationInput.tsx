import { useState } from "react";
import { Location } from "../App";

export default function LocationInput(props: {
  locations: Location[];
  setAddLocation: (arg0: boolean) => void;
  setLocations: (arg0: Location[]) => void;
}) {
  const [location, setLocation] = useState("");

  function addLocation(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newLocations: Location[] = [...props.locations];
    newLocations.push({
      name: location,
    });
    localStorage.setItem("locations", JSON.stringify(newLocations));
    props.setAddLocation(false);
    props.setLocations(newLocations);
  }

  return (
    <main>
      <form onSubmit={addLocation}>
        <label htmlFor="location">Stadt eingeben: </label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
        />
        <button>Hinzufügen</button>
      </form>
    </main>
  );
}
