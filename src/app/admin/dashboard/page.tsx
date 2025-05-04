'use client';

import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,Legend,} from 'recharts';
const data = [
  { name: 'شنبه', فروش: 2400, هدف: 3000 },
  { name: 'یک‌شنبه', فروش: 1398, هدف: 2500 },
  { name: 'دوشنبه', فروش: 9800, هدف: 8000 },
  { name: 'سه‌شنبه', فروش: 3908, هدف: 4000 },
  { name: 'چهارشنبه', فروش: 4800, هدف: 4500 },
  { name: 'پنج‌شنبه', فروش: 3800, هدف: 3500 },
  { name: 'جمعه', فروش: 4300, هدف: 5000 },
];


interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 bg-background min-h-screen pr-68 text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">پنل مدیریت</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            گزارش جدید
          </button>
          <button className="p-2 text-foreground/70 hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="تعداد کاربران"
          value="۱۲۵"
          change="+۱۲%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="تعداد سفارش‌ها"
          value="۴۷"
          change="+۸%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          }
        />
        <StatCard
          title="درآمد این ماه"
          value="۲،۳۵۰،۰۰۰ تومان"
          change="+۲۳%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="نرخ تبدیل"
          value="۳۲%"
          change="+۵%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background shadow-xl rounded-2xl p-6 border border-foreground/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">نمودار فروش هفتگی</h2>
            <div className="flex space-x-2 space-x-reverse">
              <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md">
                هفتگی
              </button>
              <button className="px-3 py-1 text-sm text-foreground/70 hover:bg-foreground/10 rounded-md">
                ماهانه
              </button>
              <button className="px-3 py-1 text-sm text-foreground/70 hover:bg-foreground/10 rounded-md">
                سالانه
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-foreground)/10"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-foreground)/70' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-foreground)/70' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-foreground)/10',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="فروش"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="هدف"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background shadow-xl rounded-2xl p-6 border border-foreground/10">
          <h2 className="text-xl font-semibold mb-6">آخرین فعالیت‌ها</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                user: 'علی محمدی',
                action: 'سفارش جدید',
                time: '۲ دقیقه پیش',
                color: 'bg-primary/10 text-primary',
              },
              {
                id: 2,
                user: 'مریم احمدی',
                action: 'پرداخت موفق',
                time: '۱۵ دقیقه پیش',
                color: 'bg-secondary/10 text-secondary',
              },
              {
                id: 3,
                user: 'رضا حسینی',
                action: 'ثبت نام جدید',
                time: '۱ ساعت پیش',
                color: 'bg-primary/10 text-primary',
              },
              {
                id: 4,
                user: 'نازنین کریمی',
                action: 'درخواست پشتیبانی',
                time: '۲ ساعت پیش',
                color: 'bg-yellow-500/10 text-yellow-500',
              },
              {
                id: 5,
                user: 'محمد رضایی',
                action: 'کامنت جدید',
                time: '۵ ساعت پیش',
                color: 'bg-purple-500/10 text-purple-500',
              },
            ].map(item => (
              <div
                key={item.id}
                className="flex items-start space-x-3 space-x-reverse"
              >
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${item.color}`}
                >
                  {item.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.user}</p>
                  <p className="text-sm text-foreground/70">
                    {item.action} • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-background rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border-l-4 border-primary">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-foreground/70">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="p-2 rounded-lg bg-primary/10">{icon}</div>}
      </div>
      {change && (
        <span className="text-sm text-secondary bg-secondary/10 px-2 py-1 rounded-md inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {change}
        </span>
      )}
    </div>
  );
}
