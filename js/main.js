require.config({
    baseUrl: "js/lib"
});
requirejs(["jquery","china","echarts","../drawmap"],function ($,sino,echarts,drawMap) {
    var chinaMap = $("#chinaMap"),
        SINOMAP = echarts.init(document.getElementById("china-map"));
    //获取数据
    var cities = [];
    SINOMAP.showLoading();
    $.get("https://sin-iti.github.io/aqi/data/cities-aqi.json",function (cityAqi) {//获取城市空气质量
        for (var NoSenseA = 0; NoSenseA < cityAqi.length; NoSenseA ++) {
            cities[NoSenseA] = new Object();
            cities[NoSenseA].name = cityAqi[NoSenseA].area;
            cities[NoSenseA].value = [
                cityAqi[NoSenseA].quality,
                cityAqi[NoSenseA].level,
                cityAqi[NoSenseA].aqi,
                cityAqi[NoSenseA].primary_pollutant
            ]
        }
        $.get("https://sin-iti.github.io/aqi/data/china-cities.json",function (sinoCityData) {//获取城市坐标
            var sinoCity = sinoCityData.features;
            for (var IndexCityCoordinate = 0; 
                 IndexCityCoordinate < sinoCity.length; 
                 IndexCityCoordinate ++
                ) {
                for (var IndexAqi = 0; IndexAqi < cities.length; IndexAqi ++) {
                    if (cities[IndexAqi].name 
                        == sinoCity[IndexCityCoordinate].properties.name
                       ) {                        
                        cities[IndexAqi].value.unshift(
                            sinoCity[IndexCityCoordinate].properties.cp[0],
                            sinoCity[IndexCityCoordinate].properties.cp[1]
                        );
                    }                    
                }
            }
            SINOMAP.hideLoading();
            //绘制散点图
            var option = drawMap(cities);
            SINOMAP.setOption(option);
        });
    });
})
