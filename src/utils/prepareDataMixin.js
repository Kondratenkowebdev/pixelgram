export default {
    methods: {
        getDuplicateColorObject() {
            let arrayOfColors = this.initialData.filter((color) => {
                return this.isPixelForDrawing(color)
            }).sort();

            let current = null;
            let cnt = 0;
            let data = [];
            let baseNumber = 1;
            for (let i = 0; i < arrayOfColors.length; i++) {
                if (arrayOfColors[i] !== current) {
                    if (cnt > 0) {
                        data.push(
                            {
                                color: current,
                                count: cnt,
                            }
                        );
                        baseNumber += 1
                    }
                    current = arrayOfColors[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                data.push(
                    {
                        color: current,
                        count: cnt,
                    }
                );
            }

            data.sort((objectA, objectB) => {
                return objectB.count - objectA.count;
            });

            data.forEach((item, i) => {
                item['number'] = i + 1
            });

            return data
        },
        prepareDataForRender() {
        return  this.initialData
                .map((color, index) => {
                let colorData = this.colorsDuplicateCount.find(x => x.color === color);
                return {
                    'number': colorData ? colorData.number : null,
                    'fill': false,
                    'color': color,
                    'left': (index % this.canvasNumberByWidth) * this.squareSize + 2,
                    'top': Math.floor(index/this.canvasNumberByWidth) * this.squareSize + 2,
                }
                }).filter((item) => {
                    return this.isPixelForDrawing(item.color)
                })
        },
    },
};
