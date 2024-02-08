export const errorHandling = function (data: any, error: string | Error) {
    if (error instanceof Error) {
        return {
            success: false,
            error: error
        }
    } else if (typeof error === 'string') {
        return {
            success: false,
            error: new Error(error)
        }
    } else {
        return {
            success: true,
            data:data
        }
    }
}