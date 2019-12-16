import React from 'react';
import moment from 'moment';

import '../assets/style.css';
import '../assets/style_title.css';


export default ({ courses }) => {
  const colors = ['#E4382B','#89C443','#CD326F','#F3983D','#3C9889','#4DBBD4','#EFC641','#9C339A','#3A51B6'];
  const calcEventWidth = (start, end) => {
    if (!start || !end) return '0px';
  
    if (typeof start !== 'object') start = moment(start, 'HH:mm');
    if (typeof end !== 'object') end = moment(end, 'HH:mm');
  
    const duration = moment.duration(end.diff(start));
    const minutes = duration.asMinutes();
  
    return `${minutes * 1.5}px`;
  }
  const zeroFill = num => num < 10 ? `0${num}` : `${num}`; 

  return (
  <table align="center" border="0" style={{width: '1366px'}}>
    <tbody>
      <tr>
        <td className="outerTd">
          <div id="wrapper-title">
            <div id="scheduler-wrapper-title">
              <div id="timeline-title"></div>
              <div id="scheduler-title"><div className="bar"></div>อาทิตย์</div>
              <div id="scheduler-title2"><div className="bar"></div>จันทร์</div>
              <div id="scheduler-title3"><div className="bar"></div>อังคาร</div>
              <div id="scheduler-title4"><div className="bar"></div>พุธ</div>
              <div id="scheduler-title5"><div className="bar"></div>พฤหัส</div>
              <div id="scheduler-title6"><div className="bar"></div>ศุกร์</div>
              <div id="scheduler-title7"><div className="bar"></div>เสาร์</div>
            </div>
          </div> 
        
          <div id="wrapper" style={{width: '1260px'}}>
            <div className="tt-times">
              {[...Array(13)].map((_, i) => <div className="tt-time" style={{left: `${45 + (i*90)}px`}} />)}
            </div>
        
            <div id="scheduler-wrapper">
              <div id="timeline2">
                {[...Array(14)].map((_, i) => 
                <div className="major" style={{left: `${i*90}px`}}>{zeroFill(i+7)}:00-{zeroFill(i+8)}:00</div>)}
              </div>

              {Object.keys(courses).map(day => {
                return <div id={`scheduler${day}`} key={day}>
                  {courses[day].map(course => {
                    return <div className="event" style={{
                      width: calcEventWidth(course.start, course.end),
                      height: '82px',
                      left: calcEventWidth('07:00', course.start)
                    }}>
                    <div className="bar"></div>
                    <div className="content" style={{backgroundColor: colors[course.idx]}}>
                      <div className="inner-content">
                          <span className="event-title"><b><u>{course.code}</u></b> {course.name}</span>
                          <span className="event-location">หมู่ {course.section} ห้อง {course.location}</span>
                          <span className="event-location">เวลา: {course.start}-{course.end}</span>
                      </div>
                    </div>
                  </div>
                  })}
                </div>
              })}
            </div>

          </div>
        </td>
      </tr>
    </tbody>
  </table>
  );
};