'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddress,
  setCity,
  setPostalCode,
} from '@/redux/slices/shipmentSlice';
import { FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { RootState } from '@/redux/store';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  const defaultPosition: [number, number] = [35.6892, 51.3890];

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
      <div className="h-64 mt-8 rounded-lg overflow-hidden z-0">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          className="w-full h-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={defaultPosition} />
        </MapContainer>
      </div>
    </div>
  );
};
