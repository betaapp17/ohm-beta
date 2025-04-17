import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function DispatcherForm() {
  const [form, setForm] = useState({
    driver: "",
    truck: "",
    date: "",
    stops: Array(5).fill({ customer: "", town: "", slabs: "", cod: "", so: "" })
  });

  const handleStopChange = (i, field, value) => {
    const newStops = [...form.stops];
    newStops[i][field] = value;
    setForm({ ...form, stops: newStops });
  };

  const handleSubmit = () => {
    alert("Stops assigned! (Data would be saved in real app)");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Dispatcher Daily Form</h2>

          <Input
            placeholder="Driver Name"
            value={form.driver}
            onChange={(e) => setForm({ ...form, driver: e.target.value })}
          />
          <Input
            placeholder="Truck Number"
            value={form.truck}
            onChange={(e) => setForm({ ...form, truck: e.target.value })}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <h3 className="font-semibold mt-4">Stops</h3>
          {form.stops.map((stop, i) => (
            <div key={i} className="grid grid-cols-5 gap-2">
              <Input
                placeholder="Customer"
                value={stop.customer}
                onChange={(e) => handleStopChange(i, "customer", e.target.value)}
              />
              <Input
                placeholder="Town"
                value={stop.town}
                onChange={(e) => handleStopChange(i, "town", e.target.value)}
              />
              <Input
                placeholder="Slabs"
                value={stop.slabs}
                onChange={(e) => handleStopChange(i, "slabs", e.target.value)}
              />
              <Input
                placeholder="COD Type"
                value={stop.cod}
                onChange={(e) => handleStopChange(i, "cod", e.target.value)}
              />
              <Input
                placeholder="SO#"
                value={stop.so}
                onChange={(e) => handleStopChange(i, "so", e.target.value)}
              />
            </div>
          ))}

          <Button className="mt-4 w-full" onClick={handleSubmit}>
            Submit Route
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
