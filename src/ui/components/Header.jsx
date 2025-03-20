export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 h-12 bg-gray-800 flex items-center border-box "style={{ WebkitAppRegion: 'drag' }} >
      <ul className="flex space-x-4 text-white font-bold">
        <li>
          <button>close</button>
        </li>
        <li>
          {" "}
          <button className="px-2 py-1 border-sm border">minimize</button>{" "}
        </li>
        <li>
          {" "}
          <button>maximize</button>{" "}
        </li>
      </ul>
    </header>
  );
}
