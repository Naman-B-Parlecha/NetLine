import Navbar from "./components/NavBar";
import NetworkGraph from "./components/NetworkVisualizer.jsx";
import { nodes, links } from "./constants/index";
export default function Home() {
  return (
    <main className="flex h-screen">
      <Navbar />
      <section className="w-3/5 bg-white p-4">
        <h1 className="text-2xl font-bold underline">Current Network State</h1>
        <NetworkGraph nodesData={nodes} linksData={links} />
        <div className="w-full flex gap-4">
          <button
            className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Check Adjacent Nodes
          </button>
          <button
            className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Refresh page
          </button>
          <button
            className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Troubleshoot
          </button>
        </div>
      </section>
      <aside className="w-1/5 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Console</h2>
        <div>
          <p>Console Output...</p>
          {/* Add console content here */}
        </div>
      </aside>
    </main>
  );
}
