// components/common/DeleteConfirmModal.tsx
import React from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center space-y-6 w-[95%] max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <MdOutlineWarningAmber className="text-yellow-500 text-4xl" />
          <p className="text-xl font-bold text-gray-800">حذف محصول؟</p>
          <p className="text-sm text-gray-600">
            آیا مطمئنی می‌خوای این محصولو حذف کنی؟
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            بله، حذف کن
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2.5 rounded-lg transition"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
