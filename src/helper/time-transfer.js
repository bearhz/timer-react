export default function formatTimeFromMinutes(seconds){
  const min = Math.floor(seconds/60);
  const sec = seconds % 60;
  let digMin, digSec;
  if (min < 10){
    digMin = "0"+min.toString();
  }else{
    digMin = min.toString();
  }
  if(sec<10){
    digSec = "0" + sec.toString();
  }else{
    digSec = sec.toString();
  }
  return digMin+":"+digSec;
}