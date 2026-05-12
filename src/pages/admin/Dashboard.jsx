export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display-lg text-[32px] text-primary">Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl ambient-shadow border border-outline-variant/30">
          <p className="font-label-lg text-secondary uppercase tracking-widest mb-2">Total Sales</p>
          <p className="font-headline-lg text-on-surface">₹4,52,000</p>
          <p className="font-label-md text-[#10B981] mt-2">+12% from last month</p>
        </div>
        <div className="bg-surface p-6 rounded-xl ambient-shadow border border-outline-variant/30">
          <p className="font-label-lg text-secondary uppercase tracking-widest mb-2">Active Orders</p>
          <p className="font-headline-lg text-on-surface">24</p>
          <p className="font-label-md text-secondary mt-2">5 pending dispatch</p>
        </div>
        <div className="bg-surface p-6 rounded-xl ambient-shadow border border-outline-variant/30">
          <p className="font-label-lg text-secondary uppercase tracking-widest mb-2">Customers</p>
          <p className="font-headline-lg text-on-surface">512</p>
          <p className="font-label-md text-[#10B981] mt-2">+3 this week</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30">
          <h3 className="font-headline-md text-on-surface">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-md text-secondary uppercase tracking-wider">
                <th className="p-4 border-b border-outline-variant/30">Order ID</th>
                <th className="p-4 border-b border-outline-variant/30">Customer</th>
                <th className="p-4 border-b border-outline-variant/30">Date</th>
                <th className="p-4 border-b border-outline-variant/30">Amount</th>
                <th className="p-4 border-b border-outline-variant/30">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#ORD-001", name: "Anjali M.", date: "Today, 10:30 AM", amount: "₹12,500", status: "Processing" },
                { id: "#ORD-002", name: "Sneha R.", date: "Yesterday", amount: "₹4,200", status: "Shipped" },
                { id: "#ORD-003", name: "Karthik V.", date: "Oct 12", amount: "₹8,900", status: "Delivered" },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0">
                  <td className="p-4 font-label-md text-primary">{order.id}</td>
                  <td className="p-4 text-on-surface">{order.name}</td>
                  <td className="p-4 text-on-surface-variant">{order.date}</td>
                  <td className="p-4 text-on-surface">{order.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-label-md text-[10px] uppercase tracking-wider ${
                      order.status === 'Processing' ? 'bg-[#ffdad6] text-[#93000a]' : 
                      order.status === 'Shipped' ? 'bg-[#ffe088] text-[#574500]' : 
                      'bg-[#e4e2dd] text-[#1b1c19]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
