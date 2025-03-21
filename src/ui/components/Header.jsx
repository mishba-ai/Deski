export function Header() {
  return (
    <header
      className="absolute top-0 left-0 right-0 h-12 bg-gray-800 flex items-center border-box "
      style={{ WebkitAppRegion: "drag" }}
    >
      <ul className="flex space-x-4 text-white font-bold">
        <li
        id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <button>close</button>
        </li>
        <li
          id="minimize"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {" "}
          <button className="px-2 py-1 border-sm border">minimize</button>{" "}
        </li>
        <li
          id="maximize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {" "}
          <button>maximize</button>{" "}
        </li>
      </ul>
    </header>
  );
}
