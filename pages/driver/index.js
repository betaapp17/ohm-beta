// Full rebuild in progress based on your printed log sheet, dispatcher autofill, and manual override for additional stops.

import { useEffect, useState } from "react";

export default function DriverApp() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [driverInfo, setDriverInfo] = useState({ name: "", truck: "", date: new Date().toISOString().slice(0, 10) });
  const [odoStart, setOdoStart] = useState("");
  const [odoNow, setOdoNow] = useState("");
  const [fuel, setFuel] = useState([]);
  const [expenses, setExpenses] = useState({ hotel: "", meals: "", other: "" });
  const [stateline, setStateline] = useState([{ state: "", odo: "" }]);
  const [returns, setReturns] = useState([{ company: "", amount: "", check: "" }]);

  const initialStops = [
    { customer: "ABC Granite", location: "Springfield", slabs: "3", bol: "1234" },
    { customer: "XYZ Marble", location: "Riverdale", slabs: "2", bol: "5678" },
  ]; // ← Replace with dispatcher-injected data

  const [stops, setStops] = useState(initialStops.map(s => ({
    ...s,
    depart: "",
    arrive: "",
    odo: "",
    miles: "",
    return: "",
    cod: ""
  })));

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

  const addStop = () => {
    setStops([...stops, { customer: "", location: "", slabs: "", bol: "", depart: "", arrive: "", odo: "", miles: "", return: "", cod: "" }]);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      {!started ? (
        <>
          <h2>Start Shift</h2>
          <input placeholder="Driver Name" value={driverInfo.name} onChange={e => setDriverInfo({ ...driverInfo, name: e.target.value })} />
          <input placeholder="Truck Number" value={driverInfo.truck} onChange={e => setDriverInfo({ ...driverInfo, truck: e.target.value })} />
          <p>Date: {driverInfo.date}</p>
          <button onClick={handleStartShift}>Start Shift</button>
        </>
      ) : (
        <>
          <h3>Stops</h3>
          {stops.map((stop, i) => (
            <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
              <strong>Stop {i + 1}</strong>
              <p><b>Customer:</b> {stop.customer || <input placeholder="Customer" value={stop.customer} onChange={e => updateStop(i, "customer", e.target.value)} />}</p>
              <p><b>Location:</b> {stop.location || <input placeholder="Town" value={stop.location} onChange={e => updateStop(i, "location", e.target.value)} />}</p>
              <p><b>Slabs:</b> {stop.slabs || <input placeholder="Slabs" value={stop.slabs} onChange={e => updateStop(i, "slabs", e.target.value)} />}</p>
              <p><b>BOL#:</b> {stop.bol || <input placeholder="BOL#" value={stop.bol} onChange={e => updateStop(i, "bol", e.target.value)} />}</p>
              <input placeholder="Depart Time" value={stop.depart} onChange={e => updateStop(i, "depart", e.target.value)} />
              <input placeholder="Arrive Time" value={stop.arrive} onChange={e => updateStop(i, "arrive", e.target.value)} />
              <input placeholder="Odometer" value={stop.odo} onChange={e => updateStop(i, "odo", e.target.value)} />
              <input placeholder="Miles" value={stop.miles} onChange={e => updateStop(i, "miles", e.target.value)} />
              <input placeholder="Return (company)" value={stop.return} onChange={e => updateStop(i, "return", e.target.value)} />
              <input placeholder="COD (company/check#/amount)" value={stop.cod} onChange={e => updateStop(i, "cod", e.target.value)} />
            </div>
          ))}
          <button onClick={addStop}>➕ Add Stop</button>
        </>
      )}
    </div>
  );
}
