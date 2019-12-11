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
    setCourses(require('./utils/iseaParser').default(e.target.value));
  };

  return (
    <div className="App">
      <center id="introduction">
        <img src={require('./assets/example.jpg')} style={{width: '50%', minWidth: '320px'}} />
        <h3>Copy ข้อมูล<i>ที่คลุมดำตามภาพ</i> จาก KU-ISEA เมนู 958<br />มา Paste ลงในช่องว่าง เพื่อสร้างตารางเรียนแบบดั้งเดิม</h3>
        <p><textarea onChange={handleChange} placeholder="วางข้อมูลที่ได้มาจากการ Copy ตามภาพ" value={iseaData} /></p>
        <button onClick={() => window.print()}>พิมพ์ตารางเรียน</button>
      </center>
      <div id="KUTable-container" style={{width: '100%', overflowY: 'auto'}}>
        <KUTable courses={courses} />
      </div>
    </div>
  );
}

export default App;