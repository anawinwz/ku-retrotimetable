import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga';
import './App.css';

import KUTable from './components/KUTable';

const iseaParser = require('./utils/iseaParser');
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

    const parsedValue = iseaParser.default(e.target.value);
    const isSuccess = Object.keys(parsedValue).find(day => parsedValue[day].length > 0);

    ReactGA.event({
      category: 'Parse',
      action: isSuccess ? 'Success' : 'Failed'
    });
    setCourses(parsedValue);
  };

  const handleClear = () => {  
    ReactGA.event({
      category: 'Table',
      action: 'Cleared'
    });
    setIseaData('');
    setCourses(defaultCourses);
  };

  const handlePrint = () => {
    ReactGA.event({
      category: 'Table',
      action: 'Printed via button'
    });
    window.print();
  }

  useEffect(() => {
    ReactGA.initialize('UA-154189889-2');
    ReactGA.pageview('/');
  }, []);

  return (
    <div className="App">
      <center className="hideOnPrint">
        <img src={require('./assets/example.jpg')} alt="ภาพตัวอย่างการคัดลอกข้อมูลจาก KU-ISEA" style={{width: '50%', minWidth: '320px'}} />
        <h3>Copy ข้อมูล<i>ที่คลุมดำตามภาพ</i> จาก <a href="https://isea.ku.ac.th/" rel="noopener noreferrer" target="_blank">KU-ISEA</a> เมนู 958<br />มา Paste ลงในช่องว่าง เพื่อสร้างตารางเรียนแบบดั้งเดิม</h3>
        <p><textarea onChange={handleChange} placeholder="วางข้อมูลที่ได้มาจากการ Copy ตามภาพ" value={iseaData} onMouseOver={e => e.target.select()} /></p>
        <button onClick={handleClear} disabled={!iseaData}>เคลียร์ข้อมูล</button> <button onClick={handlePrint}>พิมพ์ตารางเรียน</button>
      </center>
      <div id="KUTable-container" style={{}/* {width: '100%', overflowY: 'auto'} */}>
        <KUTable courses={courses} />
      </div>

      <center className="hideOnPrint">
        <p>
          แอปนี้จัดทำเพื่อการศึกษาและอำนวยความสะดวกแก่นิสิตชาว มก. เท่านั้น<br />
          <span style={{color: 'red'}}>ตารางเรียนข้างต้นถูกสร้างขึ้นบนอุปกรณ์แต่ละเครื่องจากข้อมูลที่ป้อนเข้ามา<br />โปรดตรวจสอบตารางเรียนอย่างเป็นทางการอีกครั้งที่ KU-ISEA</span>
        </p>
        อ้างอิงจากต้นฉบับไฟล์กำหนดรูปแบบ (CSS) และโครงสร้างตาราง (HTML) ที่พัฒนาไว้โดย ฝ่ายสารสนเทศ สำนักบริการคอมพิวเตอร์ มก. เมื่อ 16 กันยายน 2553
      </center>
    </div>
  );
}

export default App;