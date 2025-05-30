"use client";
import { useEffect, useState } from "react";

export default function UserProfileInfoFields({ user, editMode, formData, handleChange }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  // Fetch countries and cities
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await res.json();
        if (data?.data) {
          setCountries(data.data);
        }
      } catch (err) {
        console.error("Could not fetch countries:", err);
      }
    }
    fetchData();
  }, []);

  // Fetch nationalities
  useEffect(() => {
    async function fetchNationalities() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const values = data
          .map((c) => c.demonyms?.eng?.m)
          .filter(Boolean)
          .sort();
        setNationalities([...new Set(values)]);
      } catch (err) {
        console.error("Could not fetch nationalities:", err);
      }
    }
    fetchNationalities();
  }, []);

  // Update cities when country changes
  useEffect(() => {
    const selected = countries.find((c) => c.country === formData.country);
    setCities(selected?.cities || []);
  }, [formData.country, countries]);

  const renderField = (label, name, value, textarea = false) => {
  const isReadOnlyField = ["username", "name", "role"].includes(name);
  const readOnly = !editMode || isReadOnlyField;

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
          rows={2}
          readOnly={readOnly}
          style={readOnly ? { backgroundColor: "#f8f9fa", cursor: editMode && isReadOnlyField ? "not-allowed" : "default" } : {}}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
          readOnly={readOnly}
          style={readOnly ? { backgroundColor: "#f8f9fa", cursor: editMode && isReadOnlyField ? "not-allowed" : "default" } : {}}
        />
      )}
    </div>
  );
};


  return (
    <div className="mt-3">
      {renderField("Username", "username", user.username)}
      {renderField("Name", "name", `${user.name} ${user.surname}`)}
      {renderField("Role", "role", user.role)}

      {/* Nationality */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Nationality</label>
        {editMode ? (
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a nationality</option>
            {nationalities.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        ) : (
          <p className="form-control-plaintext text-muted">{formData.nationality || "Not provided"}</p>
        )}
      </div>

      {/* Country */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Country</label>
        {editMode ? (
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a country</option>
            {countries.map((item) => (
              <option key={item.country} value={item.country}>
                {item.country}
              </option>
            ))}
          </select>
        ) : (
          <p className="form-control-plaintext text-muted">{formData.country || "Not provided"}</p>
        )}
      </div>

      {/* City */}
      <div className="mb-3">
        <label className="form-label fw-semibold">City</label>
        {editMode ? (
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-select"
            disabled={!formData.country}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        ) : (
          <p className="form-control-plaintext text-muted">{formData.city || "Not provided"}</p>
        )}
      </div>

      {renderField("Description", "description", formData.description, true)}
    </div>
  );
}
