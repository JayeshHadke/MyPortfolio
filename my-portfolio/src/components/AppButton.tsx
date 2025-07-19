interface AppButtonProps {
  label: string;
  iconUrl: string;
  description?: string;
  link?: string;
  selected?: boolean;
}

export default function AppButton({
  label,
  iconUrl,
  description,
  link,
  selected = false,
}: AppButtonProps) {
  return (
    <div className="relative group">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded ${
          selected ? "bg-zinc-700" : ""
        }`}
        title={label}
      >
        <img src={iconUrl} alt={label} className="w-5 h-5 object-contain" />
      </a>

      {/* Tooltip */}
      {description && (
        <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 w-max max-w-[200px] px-3 py-1 text-xs bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition z-50 whitespace-normal text-center border border-zinc-300">
          {description}
        </div>
      )}

      {/* Active bar like Windows */}
      {selected && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-full bg-sky-400 shadow-md" />
      )}
    </div>
  );
}
