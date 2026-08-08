function StatusBadge({ status }) {
  const styles = {
    completed:
      "bg-green-400/10 text-green-400 border-green-400/20",

    pending:
      "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",

    rejected:
      "bg-red-400/10 text-red-400 border-red-400/20",

    shortlisted:
      "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
  };

  const currentStyle =
    styles[status?.toLowerCase()] ||
    "bg-gray-400/10 text-gray-400 border-gray-400/20";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${currentStyle}`}
    >
      {status || "Unknown"}
    </span>
  );
}

export default StatusBadge;