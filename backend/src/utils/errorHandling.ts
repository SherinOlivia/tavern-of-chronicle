export const errorHandling = function (data: any, error: string | Error | null) {
    if (error === null) {
        return {
            success: true,
            data:data
        }
    } else {
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
        }
    }
}