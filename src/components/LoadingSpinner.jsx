function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400" />

      <p className="text-sm text-gray-400">
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;