"use client";

//Import the necessary hooks (useState and useEffect) from React.
import { useState } from 'react';
import { getTemplateData } from '@/lib/checklists/actions';

export default function TestPage() {
  //Set up a state to hold the fetched data.
  const [data, setData] = useState<any[]>([]);

  //Fetch the data when the component is mounted.
  const handleButtonClick = async () => {
    const fetchedData = await getTemplateData();
    setData(fetchedData);
  };

  return (
    <div>
      {/* Modify the onClick handler to update the state with the fetched data. */}
      <button type="submit" onClick={handleButtonClick}>Get data</button>
      <div>
      {data.length > 0 ? (
                            <ul>
                                {data.map((item, index) => (
                                <li key={index}>{JSON.stringify(item)}</li>
                                ))}
                            </ul>
                            ) : (
                            <p>No data available</p>
                            )}
      </div>
    </div>
  )
}