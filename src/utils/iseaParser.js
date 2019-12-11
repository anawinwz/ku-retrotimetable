

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

  const pattern = /\d\t([\d-]+)\t(.*)\t\d\t(?:บรรยาย|ปฏิบัติ)\t\d\(\d-\d-\d\)\tวิทยาเขต.*\t([\u0E00-\u0E7F]{1,2})(?:\r\n|\n)(\d{2}:\d{2})-(\d{2}:\d{2})\t([\u0E00-\u0E7Fa-zA-Z\d -]+)/g;
  let match = pattern.exec(text);
  if (match === null) {
    return ret;
  }

  while (match !== null) {
    const day = mapDayToIndex(match[3]);
    if (!day) {
      match = pattern.exec(text);
      continue;
    }

    let course = {};
    course.code = match[1];
    course.name = match[2];
    course.start = match[4];
    course.end = match[5];
    course.location = match[6] || '';
    ret[day].push(course);

    match = pattern.exec(text);
  }

  return ret;
};
export default iseaParser;