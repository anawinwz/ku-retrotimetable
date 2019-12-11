import React, {useState} from 'react';
import './App.css';

import KUTable from './components/KUTable';

function App() {
  const [iseaData, setIseaData] = useState('');
  const [courses, setCourses] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  });

  const handleChange = e => {
    setIseaData(e.target.value);
  };

  return (
    <div className="App">
      <textarea onChange={handleChange} placeholder="วางข้อมูลจากตาราง">{iseaData}</textarea>
      <KUTable courses={courses} />
    </div>
  );
}

export default App;