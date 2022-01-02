export default [
  // --------------------cmdb----------------------------
  {
    path: 'model/:id',
    meta: {
      title: '网络设备'
    },
    component: () => import('@/views/cmdb/dynamicModel/DynamicModel')
  },
  {
    path: 'model/:id',
    meta: {
      title: '服务器'
    },
    component: () => import('@/views/cmdb/dynamicModel/DynamicModel')
  },
  {
    path: 'windows',
    meta: {
      title: 'Windows'
    },
    component: () => import('@/views/cmdb/host/windows/WindowsList')
  },
  {
    path: 'linux',
    meta: {
      title: 'Linux'
    },
    component: () => import('@/views/cmdb/host/Linux/LinuxList')
  },
  // 数据库管理
  {
    path: 'mysql',
    meta: {
      title: 'MySQL'
    },
    component: () => import('@/views/cmdb/database/mysql/MysqlList')
  },
  {
    path: 'oracle',
    meta: {
      title: 'Oracle'
    },
    component: () => import('@/views/cmdb/database/oracle/OracleList')
  },
  {
    path: 'dameng',
    meta: {
      title: '达梦'
    },
    component: () => import('@/views/cmdb/database/dameng/DamengList')
  },
  // 中间件管理
  {
    path: 'tomcat',
    meta: {
      title: 'Tomcat'
    },
    component: () => import('@/views/cmdb/middleware/tomcat/TomcatList')
  },
  {
    path: 'weblogic',
    meta: {
      title: 'weblogic'
    },
    component: () => import('@/views/cmdb/middleware/weblogic/WeblogicList')
  },
  {
    path: 'nginx',
    meta: {
      title: 'Nginx'
    },
    component: () => import('@/views/cmdb/middleware/nginx/NginxList')
  },
  {
    path: 'websphere',
    meta: {
      title: 'websphere'
    },
    component: () => import('@/views/cmdb/middleware/websphere/WebsphereList')
  },
  // 应用管理
  {
    path: 'http',
    meta: {
      title: 'HTTP'
    },
    component: () => import('@/views/cmdb/application/http/HttpList')
  },
  {
    path: 'exchange',
    meta: {
      title: 'Exchange'
    },
    component: () => import('@/views/cmdb/application/exchange/ExchangeList')
  },
  // 机房管理
  {
    path: 'room',
    meta: {
      title: '机房管理'
    },
    component: () => import('@/views/cmdb/room/room/RoomList')
  },
  {
    path: 'cabinet',
    meta: {
      title: '机柜管理'
    },
    component: () => import('@/views/cmdb/room/cabinet/CabinetList')
  },
  // 模型管理
  {
    path: 'model',
    meta: {
      title: '模型管理'
    },
    component: () => import('@/views/cmdb/model/model/ModelList')
  },
  {
    path: 'agreement',
    meta: {
      title: '协议管理'
    },
    component: () => import('@/views/cmdb/model/agreement/AgreementList')
  },
  // 资源自动发现
  {
    path: 'auto',
    meta: {
      title: '资源自动发现'
    },
    component: () => import('@/views/cmdb/auto/AutoList')
  },
  // 字典管理
  {
    path: 'type',
    meta: {
      title: '字典管理'
    },
    component: () => import('@/views/cmdb/type/TypeList')
  },
  // --------------------配置中心----------------------------
  {
    path: 'user',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/system/user/UserMain')
  },
  {
    path: 'notice',
    meta: {
      title: '通知设置'
    },
    component: () => import('@/views/system/notice/NoticeList')
  },
  {
    path: 'menu',
    meta: {
      title: '菜单管理'
    },
    component: () => import('@/views/system/menu/MenuList')
  },
  {
    path: 'brand',
    meta: {
      title: '品牌管理'
    },
    component: () => import('@/views/system/brand/BrandList')
  },
  {
    path: 'config',
    meta: {
      title: '系统配置'
    },
    component: () => import('@/views/system/config/ConfigList')
  }
]
