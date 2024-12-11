export default function Grafana(){
    return <div className="w-screen h-screen">
                <iframe src="http://localhost:3000/d/ce6k86nugtmo0b/network-data?orgId=1&from=now-6h&to=now&timezone=browser" className="h-screen w-full" ></iframe>
            </div>
}