import React, {useState} from 'react';
import './App.css';

import KUTable from './components/KUTable';

const defaultCourses = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: []
};

function App() {
  const [iseaData, setIseaData] = useState('');
  const [courses, setCourses] = useState(defaultCourses);

  const handleChange = e => {
    setIseaData(e.target.value);
    setCourses(require('./utils/iseaParser').default(e.target.value));
  };

  return (
    <div className="App">
      <center className="hideOnPrint">
        <img src={require('./assets/example.jpg')} alt="ภาพตัวอย่างการคัดลอกข้อมูลจาก KU-ISEA" style={{width: '50%', minWidth: '320px'}} />
        <h3>Copy ข้อมูล<i>ที่คลุมดำตามภาพ</i> จาก <a href="https://isea.ku.ac.th/" rel="noopener noreferrer" target="_blank">KU-ISEA</a> เมนู 958<br />มา Paste ลงในช่องว่าง เพื่อสร้างตารางเรียนแบบดั้งเดิม</h3>
        <p><textarea onChange={handleChange} placeholder="วางข้อมูลที่ได้มาจากการ Copy ตามภาพ" value={iseaData} onMouseOver={e => e.target.select()} /></p>
        <button onClick={() => {setIseaData(''); setCourses(defaultCourses);}} disabled={!iseaData}>เคลียร์ข้อมูล</button> <button onClick={() => window.print()}>พิมพ์ตารางเรียน</button>
      </center>
      <div id="KUTable-container" style={{width: '100%', overflowY: 'auto'}}>
        <KUTable courses={courses} />
      </div>

      <center className="hideOnPrint">
        แอปนี้จัดทำเพื่อการศึกษาและอำนวยความสะดวกแก่นิสิตเท่านั้น<br />
        อ้างอิงจากต้นฉบับไฟล์กำหนดรูปแบบ (CSS) และโครงสร้างตาราง (HTML) โดย ฝ่ายสารสนเทศ สำนักบริการคอมพิวเตอร์ มก. (16 กันยายน 2553)
      </center>
    </div>
  );
}

export default App;