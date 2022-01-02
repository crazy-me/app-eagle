// 系统全局变量
export const BrandIcon = [
  {
    id: 1,
    icon: require('@/assets/img/system/brand/1.png'),
    name: '戴尔（DELL）'
  },
  { id: 2, icon: require('@/assets/img/system/brand/2.png'), name: 'IBM' },
  {
    id: 3,
    icon: require('@/assets/img/system/brand/3.png'),
    name: '联想（ThinkServer）'
  },
  {
    id: 4,
    icon: require('@/assets/img/system/brand/4.png'),
    name: 'CISCO思科'
  },
  { id: 5, icon: require('@/assets/img/system/brand/5.png'), name: '山石' },
  { id: 6, icon: require('@/assets/img/system/brand/6.png'), name: '绿盟' },
  { id: 7, icon: require('@/assets/img/system/brand/7.png'), name: 'juniper' },
  {
    id: 8,
    icon: require('@/assets/img/system/brand/8.png'),
    name: '华为（HUAWEI）'
  },
  {
    id: 9,
    icon: require('@/assets/img/system/brand/9.png'),
    name: '浪潮（INSPUR）'
  },
  {
    id: 10,
    icon: require('@/assets/img/system/brand/10.png'),
    name: '华三（H3C）'
  },
  {
    id: 11,
    icon: require('@/assets/img/system/brand/11.png'),
    name: '中科曙光Sugon'
  },
  { id: 12, icon: require('@/assets/img/system/brand/12.png'), name: 'HP' },
  { id: 13, icon: require('@/assets/img/system/brand/13.png'), name: '锐捷' },
  { id: 14, icon: require('@/assets/img/system/brand/14.png'), name: '博科' },
  { id: 15, icon: require('@/assets/img/system/brand/15.png'), name: '迈普' },
  {
    id: 16,
    icon: require('@/assets/img/system/brand/16.png'),
    name: '神州数码'
  },
  { id: 17, icon: require('@/assets/img/system/brand/17.png'), name: '中兴' },
  { id: 18, icon: require('@/assets/img/system/brand/18.png'), name: '天融信' },
  { id: 19, icon: require('@/assets/img/system/brand/19.png'), name: '峰火' },
  { id: 20, icon: require('@/assets/img/system/brand/20.png'), name: '深信服' },
  {
    id: 21,
    icon: require('@/assets/img/system/brand/21.png'),
    name: '启明星辰'
  },
  { id: 22, icon: require('@/assets/img/system/brand/22.png'), name: '飞塔' },
  {
    id: 23,
    icon: require('@/assets/img/system/brand/23.png'),
    name: '网御星云'
  },
  { id: 24, icon: require('@/assets/img/system/brand/24.png'), name: '网神' },
  { id: 25, icon: require('@/assets/img/system/brand/25.png'), name: 'D-LINK' },
  {
    id: 26,
    icon: require('@/assets/img/system/brand/26.png'),
    name: 'TP-LINK'
  },
  { id: 27, icon: require('@/assets/img/system/brand/27.png'), name: '宝德' },
  { id: 28, icon: require('@/assets/img/system/brand/28.png'), name: '红杉' },
  { id: 29, icon: require('@/assets/img/system/brand/29.png'), name: 'netapp' },
  { id: 30, icon: require('@/assets/img/system/brand/30.png'), name: '古树' }
]
export const groupList = [
  {
    name: '操作系统资源',
    item: [
      {
        name: 'Windows',
        icon: require('@/assets/img/cmdb/model/windows.png'),
        candel: 0
      },
      {
        name: 'Linux',
        icon: require('@/assets/img/cmdb/model/linux.png'),
        candel: 0
      },
      {
        name: 'other',
        icon: require('@/assets/img/cmdb/model/linux.png'),
        candel: 1
      }
    ]
  },
  {
    name: '硬件设备资源',
    item: [
      {
        name: '交换机',
        icon: require('@/assets/img/cmdb/model/change.png'),
        candel: 0
      },
      {
        name: '路由器',
        icon: require('@/assets/img/cmdb/model/router.png'),
        candel: 0
      },
      {
        name: '防火墙',
        icon: require('@/assets/img/cmdb/model/fire.png'),
        candel: 1
      },
      {
        name: '服务器',
        icon: require('@/assets/img/cmdb/model/server.png'),
        candel: 1
      }
    ]
  },
  {
    name: '业务资源',
    item: [
      {
        name: 'MySQL',
        icon: require('@/assets/img/cmdb/model/mysql.png'),
        candel: 0
      },
      {
        name: 'Oracle',
        icon: require('@/assets/img/cmdb/model/oracle.png'),
        candel: 0
      },
      {
        name: '达梦',
        icon: require('@/assets/img/cmdb/model/dameng.png'),
        candel: 1
      },
      {
        name: 'Tomcat',
        icon: require('@/assets/img/cmdb/model/tomcat.png'),
        candel: 1
      },
      {
        name: 'weblogic',
        icon: require('@/assets/img/cmdb/model/weblogic.png'),
        candel: 1
      },
      {
        name: 'nginx',
        icon: require('@/assets/img/cmdb/model/nginx.png'),
        candel: 1
      },
      {
        name: 'Websphere',
        icon: require('@/assets/img/cmdb/model/websphere.png'),
        candel: 1
      },
      {
        name: '人大金仓',
        icon: require('@/assets/img/cmdb/model/kingbase.png'),
        candel: 1
      },
      {
        name: 'HTTP',
        icon: require('@/assets/img/cmdb/model/http.png'),
        candel: 1
      }
    ]
  },
  {
    name: '机房资源',
    item: [
      {
        name: '机房',
        icon: require('@/assets/img/cmdb/model/room.png'),
        candel: 0
      },
      {
        name: '机柜',
        icon: require('@/assets/img/cmdb/model/cabinet.png'),
        candel: 0
      },
      {
        name: '配件',
        icon: require('@/assets/img/cmdb/model/parts.png'),
        candel: 1
      }
    ]
  }
]
