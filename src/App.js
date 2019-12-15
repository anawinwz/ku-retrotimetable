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
const getDefaultTheme = () => {
  let theme = localStorage.getItem('theme');
  if (['dark', 'light'].includes(theme)) return theme;
  else theme = 'light';
   
  if (!window.matchMedia) return theme;
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
    ReactGA.event({
      category: 'Theme',
      action: 'System-defined',
      label: 'To Dark',
      nonInteraction: true
    });
  } else {
    ReactGA.event({
      category: 'Theme',
      action: 'System-defined',
      label: 'To Light',
      nonInteraction: true
    });
  }

  return theme;
};

function App() {
  const [iseaData, setIseaData] = useState('');
  const [courses, setCourses] = useState(defaultCourses);
  const [theme, setTheme] = useState(getDefaultTheme());

  const handleChange = e => {
    setIseaData(e.target.value);

    if (e.target.value) {
      const parsedValue = iseaParser.default(e.target.value);
      const isSuccess = Object.keys(parsedValue).find(day => parsedValue[day].length > 0);
      
      ReactGA.event({
        category: 'Parse',
        action: isSuccess ? 'Success' : 'Failed'
      });
      setCourses(parsedValue);
    }
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
  };

  const toggleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        ReactGA.event({
          category: 'Theme',
          action: 'User Toggle',
          label: 'To Dark'
        });
        break;
      default:
        setTheme('light');
        ReactGA.event({
          category: 'Theme',
          action: 'User Toggle',
          label: 'To Light'
        });
    }
  }

  useEffect(() => {
    ReactGA.initialize('UA-154189889-2');
    ReactGA.pageview('/');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);

  return (
    <div className={['App', theme]}>
      <center className="hideOnPrint">
        <h2 className="redWarning">
          แอปนี้<u>จัดทำโดยนิสิต</u>เพื่อศึกษาการพัฒนาและอำนวยความสะดวกแก่นิสิต มก. ด้วยกัน<br />
          โปรดใช้ด้วยความระมัดระวัง และตรวจสอบตารางเรียนอย่างเป็นทางการได้ที่ KU-ISEA
        </h2>
        <img src={require('./assets/example.jpg')} alt="ภาพตัวอย่างการคัดลอกข้อมูลจาก KU-ISEA" style={{width: '50%', minWidth: '320px'}} />
        <h3>Copy ข้อมูล<i>ที่คลุมดำตามภาพ</i> จาก <a href="https://isea.ku.ac.th/" rel="noopener noreferrer" target="_blank">KU-ISEA</a> เมนู 958<br />มา Paste ลงในช่องว่าง เพื่อสร้างตารางเรียนแบบดั้งเดิม</h3>
        {isSamsungBrowser && 
        <p className="warningBox">
          คุณกำลังใช้ Samsung Internet ซึ่งข้อมูลที่ได้เวลา Copy จะต่างจากเบราว์เซอร์อื่น<br /><br/>
          เราได้ปรับให้รองรับและประมวลผล<u>เท่าที่เป็นไปได้</u>แล้ว<br />โปรดตรวจสอบความถูกต้องอีกครั้ง หรือใช้เบราว์เซอร์อื่น
        </p>}
        <p><textarea onChange={handleChange} placeholder="วางข้อมูลที่ได้มาจากการ Copy ตามภาพ" value={iseaData} onMouseOver={e => e.target.select()} /></p>
        <button onClick={handleClear} disabled={!iseaData}>เคลียร์ข้อมูล</button> &nbsp;
        <button onClick={handlePrint}>Print ตารางเรียน</button> &nbsp;
        <button onClick={toggleTheme}>เปิด/ปิดไฟ</button> &nbsp;
      </center>

      <div id="KUTable-container" style={{marginTop: '25px', marginBottom: '25px'}}>
        <KUTable courses={courses} />
      </div>

      <center className="hideOnPrint">
        อ้างอิงจากต้นฉบับไฟล์กำหนดรูปแบบ (CSS) และโครงสร้างตาราง (HTML) ที่พัฒนาไว้โดย ฝ่ายสารสนเทศ สำนักบริการคอมพิวเตอร์ มก. เมื่อ 16 กันยายน 2553
        <p className="showOnDarkMode">โหมดสีโทนมืดได้รับการออกแบบขึ้นใหม่เมื่อ 15 ธันวาคม 2562</p>
      </center>
    </div>
  );
}

export default App;