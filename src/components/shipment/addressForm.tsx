import { useDispatch, useSelector } from 'react-redux';
import {
  setAddress,
  setCity,
  setPostalCode,
} from '@/redux/slices/shipmentSlice';
import { FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { RootState } from '@/redux/store';

export const AddressForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.shipment); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'address':
        dispatch(setAddress(value));
        break;
      case 'city':
        dispatch(setCity(value));
        break;
      case 'postalCode':
        dispatch(setPostalCode(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
        <FaMapMarkerAlt className="text-blue-500" />
        آدرس ارسال
      </h2>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            آدرس کامل
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="آدرس دقیق"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaCity className="text-gray-400" />
              شهر
            </label>
            <input
              type="text"
              name="city"
              value={formData.city} 
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="شهر"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              کد پستی
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode} 
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="کد پستی"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
