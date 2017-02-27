define(
    function () {
        return function classCity(cityClass,cities){
            var aqiClass = [];
            for (var NoSenseC = 0; NoSenseC < cities.length; NoSenseC ++) {
                if (cities[NoSenseC].value[2] == cityClass) {
                    aqiClass.push(cities[NoSenseC]);
                }
            }            
        return aqiClass;
    }
});