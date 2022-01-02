let Ip = ''
let DownLoadIp = ''
if (process.env.NODE_ENV === 'development') {
  Ip = '/api'
  DownLoadIp = '/template/'
} else if (process.env.NODE_ENV === 'production') {
  const oIp = window.location.host
  Ip = 'http://' + oIp
  DownLoadIp = 'http://' + oIp + '/template/'
}
const IP = {
  Ip: Ip,
  DownLoadIp: DownLoadIp
}
export default IP
