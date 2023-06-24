const Utils = {
    getNoun(num, one, two, five) {
        let n = Math.abs(num)
        if ((n > 5 && n <= 20) || n === 0) {
            return five
        }
        n %= 10
        if (n === 1) {
            return one
        }
        if (n > 2 && n <= 4) {
            return two
        }
        return one
    },
    GroupIdToString(id) {
        if (id === 0) {
            return 'Пользователь'
        }
    }
}

export default Utils