<template>
  <baidu-map v-bind:style="mapStyle"
             class="bm-view"
             ak="你的百度地图ak"
             :center="center"
             :zoom="zoom"
             :scroll-wheel-zoom="true"
             @click="selectPoint"
             @moving="syncCenterAndZoom"
             @moveend="syncCenterAndZoom"
             @zoomend="syncCenterAndZoom"
             @ready="mapReady">
    <bm-view style="width: 100%; height:500px;"></bm-view>
    <bm-marker :position="{lng: center.lng, lat: center.lat}"
               :dragging="true"
               animation="BMAP_ANIMATION_BOUNCE">
    </bm-marker>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="true"
                    :autoLocation="true"></bm-geolocation>
    <bm-control :offset="{width: '10px', height: '10px'}">
      <bm-auto-complete v-model="keyword"
                        :sugStyle="{zIndex: 999999}">
        <input type="text"
               placeholder="请输入搜索关键字"
               class="serachinput">
      </bm-auto-complete>
    </bm-control>
    <bm-local-search :keyword="keyword"
                     :auto-viewport="true"
                     style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
  </baidu-map>
</template>

<script>
import {
  BaiduMap,
  BmGeolocation,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmGeolocation,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data: function () {
    return {
      showMapComponent: this.value,
      keyword: '',
      mapStyle: {
        width: '100%', //地图画布的尺寸
        height: this.mapHeight + 'px'
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      // 地图你解析方法实例
      myGeo: null
    }
  },
  watch: {
    value: function (currentValue) {
      this.showMapComponent = currentValue
      if (currentValue) {
        this.keyword = ''
      }
    }
  },
  methods: {
    mapReady({ BMap }) {
      const _this = this
      // 获取自动定位方法
      var geolocation = new BMap.Geolocation()
      // 获取逆解析方法实例
      this.myGeo = new BMap.Geocoder()
      // 获取自动定位获取的坐标信息
      geolocation.getCurrentPosition(
        function (r) {
          _this.center = {
            lng: r.point.lng,
            lat: r.point.lat
          }
          _this.point = {
            lng: r.point.lng,
            lat: r.point.lat
          }
        },
        { enableHighAccuracy: true }
      )
    },
    selectPoint({ point }) {
      this.center = point
      const _this = this
      // 根据坐标逆解析获取地址详细描述
      this.myGeo.getLocation(point, function (result) {
        if (result) {
          _this.city = result.addressComponents.city
          _this.province = result.addressComponents.province
          _this.district = result.addressComponents.district
          //把得到的详细地址的信息回显给用户
          let shopAdder =
            result.surroundingPois.length > 0
              ? result.surroundingPois[0].address + result.surroundingPois[0].title
              : result.address
          _this.$emit('selectPoint', shopAdder)
        }
      })
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    }
  }
}
</script>

<style>
.serachinput {
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>