import React from 'react';
import moment from 'moment';

export default ({ courses }) => {
  const calcEventWidth = (start, end) => {
    if (!start || !end) return '0px';
  
    if (typeof start !== 'object') start = moment(start, 'HH:mm');
    if (typeof end !== 'object') end = moment(end, 'HH:mm');
  
    const duration = moment.duration(end.diff(start));
    const minutes = duration.asMinutes();
  
    return `${minutes * 1.5}px`;
  }


  return (
  <table align="center" border="0" style={{width: '1366px'}}>
    <tbody>
      <tr>
        <td bgcolor="#ccccff">
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
              <div className="tt-time" style={{left: '45px'}}></div>
              <div className="tt-time" style={{left: '135px'}}></div>
              <div className="tt-time" style={{left: '225px'}}></div>
              <div className="tt-time" style={{left: '315px'}}></div>
              <div className="tt-time" style={{left: '405px'}}></div>
              <div className="tt-time" style={{left: '495px'}}></div>
              <div className="tt-time" style={{left: '585px'}}></div>
              <div className="tt-time" style={{left: '675px'}}></div>
              <div className="tt-time" style={{left: '765px'}}></div>
              <div className="tt-time" style={{left: '855px'}}></div>
              <div className="tt-time" style={{left: '945px'}}></div>
              <div className="tt-time" style={{left: '1035px'}}></div>
              <div className="tt-time" style={{left: '1125px'}}></div>
            </div>
        
            <div id="scheduler-wrapper">
              <div id="timeline2">
                <div className="major" style={{left: '0px'}}>07:00 - 08:00</div>
                <div className="major" style={{left: '90px'}}>08:00 - 09:00</div>
                <div className="major" style={{left: '180px'}}>09:00 - 10:00</div>
                <div className="major" style={{left: '270px'}}>10:00 - 11:00</div>
                <div className="major" style={{left: '360px'}}>11:00 - 12:00</div>
                <div className="major" style={{left: '450px'}}>12:00 - 13:00</div>
                <div className="major" style={{left: '540px'}}>13:00 - 14:00</div>
                <div className="major" style={{left: '630px'}}>14:00 - 15:00</div>
                <div className="major" style={{left: '720px'}}>15:00 - 16:00</div>
                <div className="major" style={{left: '810px'}}>16:00 - 17:00</div>
                <div className="major" style={{left: '900px'}}>17:00 - 18:00</div>
                <div className="major" style={{left: '990px'}}>18:00 - 19:00</div>
                <div className="major" style={{left: '1080px'}}>19:00 - 20:00</div>
                <div className="major" style={{left: '1170px'}}>20:00 - 21:00</div>
              </div>

              {Object.keys(courses).map(day => {
                return <div id={`scheduler${day}`} key={day}>
                  {courses[day].map(course => {
                    return <div className="event" style={{
                      left: calcEventWidth('07:00', course.start),
                      height: '82px',
                      width: calcEventWidth(course.start, course.end),
                    }}>
                    <div className="bar"></div>
                    <div className="content" style={{background: 'red'}}>
                      <div className="inner-content">
                          <span className="event-title"><b><u>{course.code}</u></b> {course.name}</span>
                          <span className="event-location">{course.location}</span>
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
  </table>);
};