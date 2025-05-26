import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ isDark }) => {
  const data = [
    { name: 'plane', us: 400, france: 240, japan: 100 },
    { name: 'helicopter', us: 300, france: 139, japan: 200 },
    { name: 'boat', us: 200, france: 980, japan: 80 },
    { name: 'train', us: 278, france: 390, japan: 90 },
    { name: 'subway', us: 189, france: 480, japan: 140 },
    { name: 'bus', us: 239, france: 380, japan: 100 },
    { name: 'car', us: 349, france: 430, japan: 150 },
    { name: 'moto', us: 300, france: 300, japan: 120 },
    { name: 'bicycle', us: 260, france: 350, japan: 160 },
    { name: 'horse', us: 210, france: 410, japan: 180 },
    { name: 'skateboard', us: 250, france: 360, japan: 100 },
    { name: 'others', us: 190, france: 400, japan: 90 }
  ];

  const revenue = 59342.32;

  return (
    <div className={`p-4 md:p-6 ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">DASHBOARD</h1>
          <p className="text-gray-400">Welcome to your dashboard</p>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent('Name,US,France,Japan\n' + data.map(d => `${d.name},${d.us},${d.france},${d.japan}`).join('\n'))}`}
          download="report.csv"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          DOWNLOAD REPORTS
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[ 'Posts', 'Categories', 'Tags', 'Projects', 'Portfolio Visitor', 'Users', 'Views', 'Comments' ].map((item, i) => (
          <div key={i} className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div className="text-lg font-medium">{item}</div>
            <div className="text-green-400 text-sm mt-2 font-semibold">+{Math.floor(Math.random() * 30)}%</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-200'} lg:col-span-2 p-4 rounded-xl`}>
          <h2 className="text-xl font-semibold mb-2">Revenue Generated</h2>
          <div className="text-green-400 text-2xl mb-4">${revenue.toLocaleString()}</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="us" stroke="#f472b6" strokeWidth={2} />
              <Line type="monotone" dataKey="france" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="japan" stroke="#34d399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-xl`}>
          <h2 className="text-xl font-semibold mb-2">Recent Post</h2>
          <div className="text-gray-400">No recent post found</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

