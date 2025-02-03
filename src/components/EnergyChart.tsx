import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', usage: 650 },
  { name: 'February', usage: 580 },
  { name: 'March', usage: 800 },
  { name: 'April', usage: 810 },
  { name: 'May', usage: 560 },
  { name: 'June', usage: 550 },
  { name: 'July', usage: 400 },
];

const EnergyChart = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#666"
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#666' }}
            label={{ 
              value: 'Energy Usage (kWh)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#666' }
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#22C55E"
            strokeWidth={2}
            dot={{ fill: '#22C55E' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;