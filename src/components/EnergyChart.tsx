import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', usage: 4000 },
  { name: 'Tue', usage: 3000 },
  { name: 'Wed', usage: 2000 },
  { name: 'Thu', usage: 2780 },
  { name: 'Fri', usage: 1890 },
  { name: 'Sat', usage: 2390 },
  { name: 'Sun', usage: 3490 },
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
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#7E69AB"
            strokeWidth={2}
            dot={{ fill: '#7E69AB' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;