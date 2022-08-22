export function hexToRgbA(hex, opacity) {
  
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + opacity + ")"
    );
  }
  //throw new Error("Bad Hex");
}

export function dateConverter(ISOTimeFormat) {
  const date = new Date(ISOTimeFormat);
  try {
    return new Intl.DateTimeFormat(["ban", "id"]).format(date);
  } catch (error) {
    return "00/00/0000";
  }
}

export function dateConverterToTime(ISOTimeFormat) {
  const date = new Date(ISOTimeFormat);

  try {
    let months = date.getMonth();
    let day = date.getDay();

    let hour = date.getHours();
    let minute = date.getMinutes();

    let s = months + "/" + day + " " + hour + ":" + minute;
    return s;
  } catch (error) {
    return "00/00/0000";
  }
}

export function blockWheel(event){
  console.log(event)
  
  event.preventDefault();
}

export function blockScroll(event) {
  console.log(event);
  event.stopPropagation();
  event.preventDefault();
}

export function queryBuilder(query){

    let string = "?";
    Object.keys(query).forEach((key) => {

      if (query[key] === null || query[key] === undefined || query[key] === "") {

      } else{
        string = string.concat(`${key}=${query[key]}&`);
      }
    });

    return string;
}

export function errorMssageParser(message){
  const obj = JSON.parse(message);
  return obj.messages[0];
}