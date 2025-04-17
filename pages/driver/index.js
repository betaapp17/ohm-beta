import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="p-4 max-w-md mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4">
          {!started ? (
            <>
              <h2 className="text-xl font-bold">Start Shift</h2>
              <Button className="w-full" onClick={handleStartShift}>
                Start Shift
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">Driver Log</h2>
              <p className="text-sm text-gray-500">Shift started at: {startTime}</p>
              <Input
                placeholder="Start Odometer"
                value={odoStart}
                onChange={(e) => setOdoStart(e.target.value)}
              />
              <Input
                placeholder="Current Odometer"
                value={odoNow}
                onChange={(e) => setOdoNow(e.target.value)}
              />
              <p>Miles Driven: {miles}</p>

              <h3 className="text-lg font-semibold">Fuel</h3>
              <Input
                placeholder="Gallons"
                value={fuel.gallons}
                onChange={(e) => setFuel({ ...fuel, gallons: e.target.value })}
              />
              <Input
                placeholder="Price"
                value={fuel.price}
                onChange={(e) => setFuel({ ...fuel, price: e.target.value })}
              />
              <Input
                placeholder="State"
                value={fuel.state}
                onChange={(e) => setFuel({ ...fuel, state: e.target.value })}
              />

              <h3 className="text-lg font-semibold">Trip Expenses</h3>
              <Input
                placeholder="Hotel"
                value={expenses.hotel}
                onChange={(e) => setExpenses({ ...expenses, hotel: e.target.value })}
              />
              <Input
                placeholder="Meals"
                value={expenses.meals}
                onChange={(e) => setExpenses({ ...expenses, meals: e.target.value })}
              />
              <Input
                placeholder="Other"
                value={expenses.other}
                onChange={(e) => setExpenses({ ...expenses, other: e.target.value })}
              />

              <Button className="w-full mt-4">Submit Log</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
