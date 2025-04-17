import { useEffect, useState } from "react";

export default function DriverApp() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [odoStart, setOdoStart] = useState("");
  const [odoNow, setOdoNow] = useState("");
  const [miles, setMiles] = useState("");
  const [fuel, setFuel] = useState({ gallons: "", price: "", state: "" });
  const [expenses, setExpenses] = useState({ hotel: "", meals: "", other: "" });
  const [stops, setStops] = useState(Array(8).fill({ 
    depart: "", arrive: "", odo: "", miles: "", slabs: "", bol: "", 
    location: "", customer: "", return: "", cod: "" 
  }));
  const [view, setView] = useState("main");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const updateStop = (i, field, value) => {
    const newStops = [...stops];
    newStops[i][field] = value;
    setStops(newStops);
  };

  const renderMain = () => (
    <>
      <h2>Driver Log</h2>
      <p>Shift started at: {startTime}</p>
      <input placeholder="Start Odometer" value={odoStart} onChange={(e) => setOdoStart(e.target.value)} />
      <input placeholder="Current Odometer" value={odoNow} onChange={(e) => setOdoNow(e.target.value)} />
      <p>Miles Driven: {miles}</p>
    </>
  );

  const renderFuel = () => (
    <>
      <h2>Fuel</h2>
      <input placeholder="Gallons" value={fuel.gallons} onChange={(e) => setFuel({ ...fuel, gallons: e.target.value })} />
      <input placeholder="Price" value={fuel.price} onChange={(e) => setFuel({ ...fuel, price: e.target.value })} />
      <input placeholder="State" value={fuel.state} onChange={(e) => setFuel({ ...fuel, state: e.target.value })} />
    </>
  );

  const renderExpenses = () => (
    <>
      <h2>Trip Expenses</h2>
      <input placeholder="Hotel" value={expenses.hotel} onChange={(e) => setExpenses({ ...expenses, hotel: e.target.value })} />
      <input placeholder="Meals" value={expenses.meals} onChange={(e) => setExpenses({ ...expenses, meals: e.target.value })} />
      <input placeholder="Other" value={expenses.other} onChange={(e) => setExpenses({ ...expenses, other: e.target.value })} />
    </>
  );

  const renderStops = () => (
    <>
      <h2>Stops</h2>
      {stops.map((stop, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <strong>Stop {i + 1}</strong>
          <input placeholder="Depart Time" value={stop.depart} onChange={(e) => updateStop(i, "depart", e.target.value)} />
          <input placeholder="Arrive Time" value={stop.arrive} onChange={(e) => updateStop(i, "arrive", e.target.value)} />
          <input placeholder="Odometer" value={stop.odo} onChange={(e) => updateStop(i, "odo", e.target.value)} />
          <input placeholder="Miles" value={stop.miles} onChange={(e) => updateStop(i, "miles", e.target.value)} />
          <input placeholder="Slabs" value={stop.slabs} onChange={(e) => updateStop(i, "slabs", e.target.value)} />
          <input placeholder="BOL#" value={stop.bol} onChange={(e) => updateStop(i, "bol", e.target.value)} />
          <input placeholder="Location" value={stop.location} onChange={(e) => updateStop(i, "location", e.target.value)} />
          <input placeholder="Customer" value={stop.customer} onChange={(e) => updateStop(i, "customer", e.target.value)} />
          <input placeholder="Return Goods" value={stop.return} onChange={(e) => updateStop(i, "return", e.target.value)} />
          <input placeholder="COD (check # / amount)" value={stop.cod} onChange={(e) => updateStop(i, "cod", e.target.value)} />
        </div>
      ))}
    </>
  );

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto", position: "relative" }}>
      {menuOpen && (
        <div style={{ position: "absolute", top: 10, left: 10, background: "#f1f1f1", padding: "1rem", zIndex: 10, borderRadius: "8px" }}>
          <button onClick={() => { setView("main"); setMenuOpen(false); }}>Driver Log</button><br />
          <button onClick={() => { setView("fuel"); setMenuOpen(false); }}>Gas Info</button><br />
          <button onClick={() => { setView("expenses"); setMenuOpen(false); }}>Trip Expenses</button><br />
          <button onClick={() => { setView("stops"); setMenuOpen(false); }}>Stops</button><br />
        </div>
      )}

      {started && (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ position: "absolute", top: 10, left: 10, fontSize: "1.2rem", padding: "0.2rem 0.5rem", zIndex: 20 }}>
          ☰
        </button>
      )}

      {!started ? (
        <>
          <h2>Start Shift</h2>
          <button onClick={handleStartShift} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
            Start Shift
          </button>
        </>
      ) : (
        <>
          {view === "main" && renderMain()}
          {view === "fuel" && renderFuel()}
          {view === "expenses" && renderExpenses()}
          {view === "stops" && renderStops()}

          <button style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>Submit Log</button>
        </>
      )}
    </div>
  );
}
