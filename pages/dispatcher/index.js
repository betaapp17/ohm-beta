import { useState, useEffect } from "react";

export default function DispatcherForm() {
  const [form, setForm] = useState({
    driver: "",
    truck: "",
    date: new Date().toISOString().slice(0, 10),
    stops: Array(5).fill({ customer: "", town: "", slabs: "", cod: "", so: "" })
  });

  useEffect(() => {
    const saved = localStorage.getItem("dispatcher_data");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  const handleStopChange = (i, field, value) => {
    const newStops = [...form.stops];
    newStops[i][field] = value;
    setForm({ ...form, stops: newStops });
  };

  const handleSubmit = () => {
    localStorage.setItem("dispatcher_data", JSON.stringify(form));
    alert("Stops saved to local storage!");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Dispatcher Daily Form</h2>

      <input
        placeholder="Driver Name"
        value={form.driver}
        onChange={(e) => setForm({ ...form, driver: e.target.value })}
        style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
      />
      <input
        placeholder="Truck Number"
        value={form.truck}
        onChange={(e) => setForm({ ...form, truck: e.target.value })}
        style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />

      <h3 style={{ fontWeight: "600" }}>Stops</h3>
      {form.stops.map((stop, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <input
            placeholder="Customer"
            value={stop.customer}
            onChange={(e) => handleStopChange(i, "customer", e.target.value)}
          />
          <input
            placeholder="Town"
            value={stop.town}
            onChange={(e) => handleStopChange(i, "town", e.target.value)}
          />
          <input
            placeholder="Slabs"
            value={stop.slabs}
            onChange={(e) => handleStopChange(i, "slabs", e.target.value)}
          />
          <input
            placeholder="COD Type"
            value={stop.cod}
            onChange={(e) => handleStopChange(i, "cod", e.target.value)}
          />
          <input
            placeholder="SO#"
            value={stop.so}
            onChange={(e) => handleStopChange(i, "so", e.target.value)}
          />
        </div>
      ))}

      <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", width: "100%" }} onClick={handleSubmit}>
        Submit Route
      </button>
    </div>
  );
}
