'use client';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    lastName: string;
    email: string;
    tell: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoForm = ({
  formData,
  handleInputChange,
}: PersonalInfoFormProps) => (
  <div className="bg-white shadow-sm rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
      <FaUser className="text-blue-500" />
      اطلاعات شخصی
    </h2>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <FaUser className="text-gray-400" />
          نام
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="نام"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          نام خانوادگی
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="نام خانوادگی"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <FaEnvelope className="text-gray-400" />
          ایمیل
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="ایمیل"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <FaPhone className="text-gray-400" />
          شماره تلفن
        </label>
        <input
          type="text"
          name="tell"
          value={formData.tell}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="شماره تلفن"
        />
      </div>
    </form>
  </div>
);
