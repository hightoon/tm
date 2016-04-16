$(function() {

    Morris.Line({
        element: 'morris-area-chart',
        unit:"台",
        data: [{
            period: '2010 Q1',
            iphone: 2666,
            ipad: null,
            itouch: 2647
        }, {
            period: '2010 Q2',
            iphone: 2778,
            ipad: 2294,
            itouch: 2441
        }, {
            period: '2010 Q3',
            iphone: 4912,
            ipad: 1969,
            itouch: 2501
        }, {
            period: '2010 Q4',
            iphone: 6767,
            ipad: 3597,
            itouch: 5689
        }, {
            period: '2011 Q1',
            iphone: 6810,
            ipad: 1914,
            itouch: 2293
        }, {
            period: '2011 Q2',
            iphone: 5670,
            ipad: 4293,
            itouch: 1881
        }, {
            period: '2011 Q3',
            iphone: 4820,
            ipad: 3795,
            itouch: 1588
        }, {
            period: '2011 Q4',
            iphone: 15073,
            ipad: 5967,
            itouch: 5175
        }, {
            period: '2012 Q1',
            iphone: 10687,
            ipad: 4460,
            itouch: 2028
        }, {
            period: '2012 Q2',
            iphone: 8432,
            ipad: 5713,
            itouch: 1791
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['设备总数', '工作状态', '停机状态'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        unit:"台",
        data: [{
            label: "保养时间已过",
            value: 12
        }, {
            label: "剩余24小时以内",
            value: 30
        }, {
            label: "剩余一周以内",
            value: 25
        }, {
            label: "剩余一月以内",
            value: 60
        }, {
            label: "剩余两月以内",
            value: 200
        }, {
            label: "剩余两月以上",
            value: 600
        }],
        resize: true
    });
Morris.Donut({
        element: 'morris-donut-chart1',
        unit:"台",
        data: [{
            label: "保养时间已过",
            value: 12
        }, {
            label: "剩余24小时以内",
            value: 20
        }, {
            label: "剩余一周以内",
            value: 35
        }, {
            label: "剩余一月以内",
            value: 70
        }, {
            label: "剩余两月以内",
            value: 100
        }, {
            label: "剩余两月以上",
            value: 700
        }],
        resize: true
    });
Morris.Donut({
        element: 'morris-donut-chart2',
        unit:"台",
        data: [{
            label: "保养时间已过",
            value: 12
        }, {
            label: "剩余24小时以内",
            value: 50
        }, {
            label: "剩余一周以内",
            value: 25
        }, {
            label: "剩余一月以内",
            value: 60
        }, {
            label: "剩余两月以内",
            value: 300
        }, {
            label: "剩余两月以上",
            value: 400
        }],
        resize: true
    });
Morris.Donut({
        element: 'morris-donut-chart3',
        unit:"台",
        data: [{
            label: "保养时间已过",
            value: 12
        }, {
            label: "剩余24小时以内",
            value: 10
        }, {
            label: "剩余一周以内",
            value: 15
        }, {
            label: "剩余一月以内",
            value: 60
        }, {
            label: "剩余两月以内",
            value: 100
        }, {
            label: "剩余两月以上",
            value: 800
        }],
        resize: true
    });
Morris.Donut({
        element: 'morris-donut-chart4',
        unit:"台",
        data: [{
            label: "保养时间已过",
            value: 12
        }, {
            label: "剩余24小时以内",
            value: 30
        }, {
            label: "剩余一周以内",
            value: 125
        }, {
            label: "剩余一月以内",
            value: 160
        }, {
            label: "剩余两月以内",
            value: 300
        }, {
            label: "剩余两月以上",
            value: 300
        }],
        resize: true
    });
/*
    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['开机时间总和', '加载时间总和'],
        hideHover: 'auto',
        resize: true
    });
*/
});
