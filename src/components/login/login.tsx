'use client';

import { useState } from 'react';
import { loginUser, registerUser } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from 'react-icons/fi';
import poster from '@/assets/images/youtab-logo.png'
import { Input } from '@/components/base/input';
import LoaderLoading from '@/components/common/loadding';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    tell: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'ایمیل معتبر نیست';

    if (!formData.password) newErrors.password = 'رمز عبور الزامی است';
    else if (formData.password.length < 8)
      newErrors.password = 'رمز عبور باید حداقل 8 کاراکتر باشد';
    if (mode === 'register') {
      if (!formData.name) newErrors.name = 'نام الزامی است';
      if (!formData.lastName) newErrors.lastName = 'نام خانوادگی الزامی است';
      if (!formData.tell) newErrors.tell = 'تلفن الزامی است';
      if (!formData.confirmPassword)
        newErrors.confirmPassword = 'تایید رمز عبور الزامی است';
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'رمز عبور و تایید آن باید یکسان باشند';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let user;
      if (mode === 'login') {
        user = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        toast.success('خوش آمدید' ,{
            position : 'top-left',
            duration : 4000,
        });
      } else {
        user = await registerUser(formData);
        toast.success('ثبت نام با موفقیت انجام شد');
      }

      localStorage.setItem('accessToken', JSON.stringify(user));
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('خطا در عملیات!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Toaster position="top-left" />

      <div className="flex w-full md:w-1/2 justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLock className="text-[var(--primary)] text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {mode === 'login' ? 'خوش آمدید' : 'ثبت‌نام کنید'}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {mode === 'login'
                ? 'لطفا اطلاعات حساب خود را وارد کنید'
                : 'برای شروع فرم زیر را تکمیل کنید'}
            </p>
          </div>

          <div className="space-y-5">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="نام"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={<FiUser className="text-gray-400" />}
                  />
                  <Input
                    name="lastName"
                    placeholder="نام خانوادگی"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    icon={<FiUser className="text-gray-400" />}
                  />
                </div>
                <Input
                  name="tell"
                  placeholder="تلفن همراه"
                  value={formData.tell}
                  onChange={handleChange}
                  error={errors.tell}
                  icon={<FiPhone className="text-gray-400" />}
                />
              </>
            )}
            <Input
              name="email"
              placeholder="آدرس ایمیل"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<FiMail className="text-gray-400" />}
            />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="رمز عبور"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<FiLock className="text-gray-400" />}
              rightIcon={
                showPassword ? (
                  <FiEyeOff
                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FiEye
                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />
            {mode === 'register' && (
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="تایید رمز عبور"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<FiLock className="text-gray-400" />}
                rightIcon={
                  showConfirmPassword ? (
                    <FiEyeOff
                      className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <FiEye
                      className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )
                }
              />
            )}
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 transition-all text-white py-3.5 rounded-xl font-medium text-md disabled:opacity-60 shadow-lg hover:shadow-[0_5px_15px_rgba(27,128,87,0.3)]"
            >
              {loading ? (
                <>
                  <LoaderLoading/>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'ورود به حساب' : 'ثبت‌نام'}</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login'
                ? 'حساب کاربری ندارید؟'
                : 'قبلا ثبت‌نام کرده‌اید؟'}{' '}
              <button
                type="button"
                className="text-[var(--primary)] hover:text-[var(--secondary)] font-medium transition-all underline underline-offset-4"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? 'ثبت‌نام کنید' : 'ورود به حساب'}
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover" />
        <div className="relative z-10 text-center text-white p-8 max-w-md">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur border-2 border-white/20 flex items-center justify-center">
            <img
              src={poster.src}
              alt="Logo"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">به فروشگاه یوتاب خوش آمدید</h2>
          <p className="text-gray-100 text-lg leading-relaxed">
            {mode === 'login'
              ? 'به جمع هزاران کاربر راضی ما ملحق شوید'
              : 'بهترین و با کیفیت تریم لوازم را از ما بخواهید'}
          </p>
        </div>
      </div>
    </div>
  );
}
