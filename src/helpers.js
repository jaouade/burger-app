export const isNotNull = (obj) => obj !== undefined && obj !== null
export const isNull = (obj) => !isNotNull(obj)

export const getListFromObjectFromFirebase = (obj) => {
    return Object.entries(obj).map((e) => (e[1]));
}
export const getListOrders = (obj) => {
    return Object.entries(obj).map((e) => {
        return {
            ...e[1], id: e[0]
        }
    });
}

