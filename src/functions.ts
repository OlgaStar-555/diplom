export function getMinutesRu(minutes: number): string {
    const remainder = minutes % 100
    const remainderByTen = remainder % 10
    if ((remainder > 10 && remainder < 20) || remainderByTen > 4 || remainderByTen === 0) {
        return 'минут'
    }
    if (remainderByTen > 1) {
        return 'минуты'
    }
    return 'минута'

}

export function getNumFromTime(time: string): number {
    const timeArr = time.split(':')

    if (timeArr.length === 2) {
        return parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])
    }
    return 0
}