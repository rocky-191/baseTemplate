function getEndTime(endTime) {
    let startDate = new Date();
    let endDate = new Date(endTime);
    let t = endDate.getTime() - startDate.getTime();
    let d = 0;
    	h = 0;
    	m = 0;
    	s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return `剩余时间${d}天${h}小时${m}分钟${s}秒"`;
}
console.log([1, 2, 3, 4].find((n) => n > 2));