'use client'
 
import { useSearchParams } from 'next/navigation'
import {APIProvider, Map} from '@vis.gl/react-google-maps';
 
export default function Page() {
  const searchParams = useSearchParams()
 
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  const googleMapsKey = 'AIzaSyA-mBU9gZWQGIEL9FdA3UKybeKiqEJI6EE';//process.env.MAP_API_KEY;
  const StreetMapOptions = {
    position: { lat: lat, lng: lng },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return (<div>
    <div
      style={{
        width: "1000px",
        height: "800px",
        backgroundColor: "#cccccc",
      }}
    >
      <APIProvider apiKey={googleMapsKey}>
        <Map
          zoom={3}
          center={{lat: 22.54992, lng: 0}}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  </div>)
}