function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B2342] p-6 shadow-2xl">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="text-gray-300">
          {children}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#071A33] hover:bg-cyan-300"
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Modal;