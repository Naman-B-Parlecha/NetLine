import Navbar from "./components/NavBar";
import ButtonGroup from "./components/Network/ButtonGroup";
import NetworkGraph from "./components/Network/NetworkVisualizer.jsx";
import { nodes, links } from "./constants/index";
export default function Home() {

  return (
    <main className="flex h-screen">
      <Navbar />
      <section className="w-3/5 bg-white p-4">
        <h1 className="text-2xl font-bold underline">Current Network State</h1>
        <NetworkGraph nodesData={nodes} linksData={links} />
        <ButtonGroup />
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
