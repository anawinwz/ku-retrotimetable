

const mapDayToIndex = day => {
  switch (day) {
    case 'อา': return 1;
    case 'จ': return 2;
    case 'อ': return 3;
    case 'พ': return 4;
    case 'พฤ': return 5;
    case 'ศ': return 6;
    case 'ส': return 7;
    default: return null;
  }
}



const iseaParser = text => {
  let ret = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  };
  let courses = [];
  
  const pattern = /(0[12345]\d{6}-\d{2})(?:\t|)([\u0E00-\u0E7Fa-zA-Z\d -\.]+)(?:\t|)(?:(\d{1,3})(?:\t|)บรรยาย|(\d{2,3})(?:\t|)ปฏิบัติ)(?:\t|)\d\(\d-\d-\d\)(?:\t|)วิทยาเขต(?:บางเขน|กำแพงแสน|สกลนคร|ศรีราชา|สุพรรณบุรี)(?:\t|)([\u0E00-\u0E7F]{1,2}).*(?:\r\n|\n)(\d{2}:\d{2})-(\d{2}:\d{2})(?:\t|)([\u0E00-\u0E7Fa-zA-Z\d -\.]+)/g;
  let match = pattern.exec(text);
  if (match === null) {
    return ret;
  }

  while (match !== null) {
    const day = mapDayToIndex(match[5]);
    if (!day) {
      match = pattern.exec(text);
      continue;
    }

    let course = {};
    let idx;
    course.code = match[1];
    if ((idx = courses.findIndex(code => code === course.code)) === -1) {
      courses.push(course.code);
      course.idx = courses.length - 1;
    } else {
      course.idx = idx;
    }
    course.name = match[2];
    course.section = match[3] || match[4];
    course.start = match[6];
    course.end = match[7];
    course.location = match[8] || '';
    ret[day].push(course);

    match = pattern.exec(text);
  }

  return ret;
};
export default iseaParser;