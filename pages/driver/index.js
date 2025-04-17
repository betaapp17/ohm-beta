import { useEffect, useState } from "react";

export default function DriverApp() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [odoStart, setOdoStart] = useState("");
  const [odoNow, setOdoNow] = useState("");
  const [miles, setMiles] = useState("");
  const [fuel, setFuel] = useState({ gallons: "", price: "", state: "" });
  const [expenses, setExpenses] = useState({ hotel: "", meals: "", other: "" });

  useEffect(() => {
    if (odoStart && odoNow) {
      const m = parseInt(odoNow) - parseInt(odoStart);
      setMiles(isNaN(m) ? "" : m.toString());
    }
  }, [odoStart, odoNow]);

  const handleStartShift = () => {
    const now = new Date();
    setStartTime(now.toLocaleTimeString());
    setStarted(true);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      {!started ? (
        <>
          <h2>Start Shift</h2>
          <button onClick={handleStartShift} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
            Start Shift
          </button>
        </>
      ) : (
        <>
          <h2>Driver Log</h2>
          <p>Shift started at: {startTime}</p>
          <input
            placeholder="Start Odometer"
            value={odoStart}
            onChange={(e) => setOdoStart(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <input
            placeholder="Current Odometer"
            value={odoNow}
            onChange={(e) => setOdoNow(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <p>Miles Driven: {miles}</p>

          <h3>Fuel</h3>
          <input
            placeholder="Gallons"
            value={fuel.gallons}
            onChange={(e) => setFuel({ ...fuel, gallons: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <input
            placeholder="Price"
            value={fuel.price}
            onChange={(e) => setFuel({ ...fuel, price: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <input
            placeholder="State"
            value={fuel.state}
            onChange={(e) => setFuel({ ...fuel, state: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />

          <h3>Trip Expenses</h3>
          <input
            placeholder="Hotel"
            value={expenses.hotel}
            onChange={(e) => setExpenses({ ...expenses, hotel: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <input
            placeholder="Meals"
            value={expenses.meals}
            onChange={(e) => setExpenses({ ...expenses, meals: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <input
            placeholder="Other"
            value={expenses.other}
            onChange={(e) => setExpenses({ ...expenses, other: e.target.value })}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />

          <button style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>Submit Log</button>
        </>
      )}
    </div>
  );
}
